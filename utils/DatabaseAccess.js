import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('Fitness');

const InitDb = async () => {

    try{
        // await db.runAsync(`DROP TABLE IF EXISTS Exercises;`);
        await db.runAsync(`CREATE TABLE IF NOT EXISTS Exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            muscleGroup TEXT NOT NULL,
            type INTEGER NOT NULL,
            isCompound INTEGER NOT NULL
            );`);
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

export {db, InitDb ,AddExercise, GetExercises};