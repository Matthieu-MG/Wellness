import * as SQLite from 'expo-sqlite'
import { SerializeMedicalRecord } from './JSONSerializer';
import { ValidateMedicalRecord } from '../utils/Validators';

const db = SQLite.openDatabaseSync('Fitness');

const InitDb = async () => {

    try{
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS Exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name TEXT NOT NULL,
                muscleGroup TEXT NOT NULL,
                type INTEGER NOT NULL,
                isCompound INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS Workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name TEXT NOT NULL UNIQUE
            );
            CREATE TABLE IF NOT EXISTS WorkoutExercises (
                workoutId INTEGER NOT NULL,
                exerciseId INTEGER NOT NULL,
                sets TEXT NOT NULL,
                reps TEXT NOT NULL,
                weight TEXT NOT NULL,
                FOREIGN KEY (workoutId) REFERENCES Workouts(id),
                FOREIGN KEY (exerciseId) REFERENCES Exercises(id),
                PRIMARY KEY (workoutId, exerciseId)
            );
            CREATE TABLE IF NOT EXISTS MedicalRecords (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name TEXT NOT NULL UNIQUE,
                uri TEXT NOT NULL UNIQUE,
                description TEXT
            );
        `);
    }
    catch (error){
        console.log("ERROR INITIALIZING DB: ", error);
    }
} 

/*
type: Exercise
    name: string
    muscleGroup : [{muscle: string}]
    type: string / parsed from int
*/
async function AddExercise(exercise) {
    
    try {

        //* If exercise targets more than one muscle group, it is a compound exercise
        exercise.isCompound = exercise.muscleGroup.length > 1;
        
        //* If exercise is compound store comma separated muscles: i.e "1, 4, 2" else, "1"
        exercise.muscles = exercise.muscleGroup.map( (m) => m.muscle ).toString();

        //* Add exercise to DB
        await db.runAsync('INSERT INTO Exercises (name, muscleGroup, type, isCompound) VALUES (?, ?, ?, ?);', 
            exercise.name, exercise.muscles, parseInt(exercise.type), exercise.isCompound);
    }
    catch (error) {
        console.log("ERROR ADDING EXERCISE: ", error);
    }
}

//* Field can only be 'name' or 'type' here. For Muscle Group Use GetExercisesByMuscleGroup
async function GetExercises(query) {
    try {
        const sql = `SELECT * FROM Exercises ${query};`;
        console.log('SQL QUERY: ', sql)
        return await db.getAllAsync(sql)
    }
    catch (error) {
        console.log(`ERROR FETCHING EXERCISES WITH QUERY ${query} `, error);
        return []
    }
}

async function AddWorkout(workout) {

    try {
        //* Workout
        const name =  workout.name;
        await db.runAsync('INSERT INTO Workouts (name) VALUES (?);', name);
        
        //* store this workout id
        const workoutId = (await db.runAsync('SELECT last_insert_rowid();')).lastInsertRowId;
        console.log("workoutId", JSON.stringify(workoutId, null, 2));

        let sql = ''
        workout.exercises.forEach(exo => {
            sql += `INSERT INTO WorkoutExercises (workoutId, exerciseId, sets, reps, weight)
            VALUES ('${workoutId}' ,'${exo.id}', '${exo.sets}', '${exo.reps}', '${exo.weight}');`
        });
        
        console.log("Query: ", sql);
        
        //* Insert to joint table
        await db.execAsync(sql);
    }
    catch (error) {
        if(error.message.contains('UNIQUE constraint failed')) {
            console.log("The workout name needs to be unique")
            return 'The workout name needs to be unique'
        }
        console.log(`ERROR from AddWorkout (DatabaseAccess.js module) : ${error}`);
    }
}

async function GetWorkouts() {
    try {
        return await db.getAllAsync('SELECT * FROM Workouts;');
    }
    catch (error) {
        console.log(`ERROR FROM GetWorkouts: ${error}`);
    }
}

async function GetWorkoutsByName(name) {
    try {
        return await db.getAllAsync('SELECT * FROM Workouts WHERE name = ?', name);
    }
    catch (error) {
        console.log('ERROR FROM GetWorkoutsByName: ', error);
        return [];
    }
}

async function GetWorkoutExercises(id) {
    try {
        const exercises = await db.getAllAsync(`SELECT exerciseId, sets, reps, weight FROM WorkoutExercises WHERE workoutId = ?;`, id);
        
        console.log("exos: ", await db.getAllAsync(`SELECT * FROM WorkoutExercises;`));

        const exerciseIds = exercises.map(e => e.exerciseId);
        const placeholders = exerciseIds.map(() => "?").join(", ");

        const exerciseDetails = await db.getAllAsync(`SELECT id, name, muscleGroup, type, isCompound 
                                                      FROM Exercises WHERE id IN (${placeholders});`, exerciseIds)

        const results = exerciseDetails.map( (exercise, index) => {
            const exerciseIndex = exercises.findIndex((exo) => exo.exerciseId === exercise.id)
            const exo = exercises[exerciseIndex];
            return {
                ...exercise,
                sets: exo.sets,
                reps: exo.reps,
                weight: exo.weight
            }
        })

        // TODO Cache Results
        return results;
    }
    catch (error) {
        console.log(`ERROR FROM GetWorkoutExercises: `, error);
    }
}

async function AddMedicalRecord(record = {name:"BaseName", uri:"BaseUri", description:""}) {

    console.log("Adding Medical Record: ", record.name);

    let response = {
        ok: true,
        messages: []
    }

    const name = record.name;
    const uri = record.uri;
    const description = record.description;
    
    try {

        response = ValidateMedicalRecord(record);

        console.log("Response of ValidateMedicalRecord: ", response);

        if(!response.ok) {
            console.log(response.ok);
            return response;
        }

        //* Replaces white spaces
        const fileExtension = uri.split(".").pop();
        const localURI = name.replace(/ /g, "_") + `.${fileExtension}`;
        console.log("localURI: ", localURI);

        //* Serialize File
        if ( !(await SerializeMedicalRecord(uri, localURI)) ) {
            response.ok = false;
            response.messages.push("ERROR Saving the file picked");
            return response;
        }

        //* Save in db
        await db.runAsync('INSERT INTO MedicalRecords (name, uri, description) VALUES (?, ?, ?);',
                           name, localURI, description
                        );

        return response;
    }
    catch (error) {
        response.ok = false;
        console.error("ERROR from AddMedicalRecord (DatabaseAccess.js): ", error);
        
        if(error.message.contains("UNIQUE constraint failed")) {
            response.messages.push("Name and File URI should be unique!")
        }
        return response;
    }
}

async function GetMedicalRecords() {
    try {
        return await db.getAllAsync('SELECT * FROM MedicalRecords');
    }
    catch (error) {
        console.error("ERROR from GetMedicalRecords (DatabaseAccess.js): ", error);
        return [];
    }
}

export {db, InitDb ,AddExercise, AddWorkout, GetExercises, 
        GetWorkouts, GetWorkoutsByName, GetWorkoutExercises,
        AddMedicalRecord, GetMedicalRecords};