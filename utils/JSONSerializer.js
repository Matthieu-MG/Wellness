import * as FileSystem from 'expo-file-system'
import { removeDailyTreatmentNotifications, removeWeeklyOrMonthlyTreatmentNotifications } from './Notifications';
import { DAILY } from './Days';

async function SerializeJSON(data, path) {
    
    const fileUri = FileSystem.documentDirectory + path;
    const jsonString  = JSON.stringify(data, null, 2);

    try {

        await FileSystem.writeAsStringAsync(fileUri, jsonString);
    
    }
    catch (error) {
        console.log(error);
    }
}

async function SerializeTreatment(data) {
    const path = "treatments.json"
    
    try {
        //* Read from path
        const treatments = await DeserializeTreatment(path);

        //* Add new treatment and save
        treatments.push(data);

        SerializeJSON(treatments, path);
    }
    catch (error) {
        //* In case fileContent cannot be parsed or is empty
        await SerializeJSON([data], path);
    }
}

async function DeserializeTreatment(path) {
    const fileUri = FileSystem.documentDirectory + path;

    try {
        //* If no file exists there, or no array empty, then create array
        const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
        let treatments = fileContent ? JSON.parse(fileContent) : []
        
        if (!Array.isArray(treatments)) {
            throw new Error("ERROR: Expected Treatments to be an array")
        }

        return treatments;
    }
    catch (error) {
        //* File does not exist, return empty array
        console.log('Deserialize warning: Could not find file: ',error);
        return [];
    }
}

async function DeleteTreatment(treatments, index) {
    try {
        console.log("In DeleteTreatments: ",treatments);
        const treatment = treatments[index]
        
        if(treatment.treatmentName === null || treatment.treatmentName.length < 0) return;

        if(treatment.frequency === DAILY) {
            removeDailyTreatmentNotifications(treatment);
        }
        else {
            console.log("Removing W/M Notifications!")
            removeWeeklyOrMonthlyTreatmentNotifications(treatment);
        }

        treatments.splice(index, 1);

        //* Ensures Serialization before allowing user to delete another treatment after re-render
        await SerializeJSON(treatments, 'treatments.json');

        return treatments;
    }
    catch (error) {
        console.log("ERROR from DeleteTreatment: ", error);
    }
}

async function SerializeRoutine(data) {
    const path = "routine.json"

    try {
        if(Array.isArray(data) && data.length === 7) {
            //* Check if each element is correct object props
            SerializeJSON(data, path);
        }
        else {
            //! INVALID DATA PASSED
            console.log("ERROR from SerializeRoutine: data is not an Array of Length: 7");
        }
    }
    catch (error) {
        console.log("ERROR from SerializeRoutine: ", error);
    }
}

async function DeserializeRoutine() {
    const path = "routine.json";
    const fileUri = FileSystem.documentDirectory + path;
    
    try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
        // TODO some validations check on routine array of objects

        console.log("file content: ", fileContent);
        
        const routine = fileContent ? JSON.parse(fileContent) : createBaseRoutineArray();

        return routine;
    }
    catch (error) {
        console.log("Cannot read file -> Basic Routine Array created : ", error);
        return createBaseRoutineArray()
    }
}

const createDayObject = (day, value) => {
    return {
        label: day,
        value: value,
        workoutId: -1,
        workoutName: "REST"
    }
}

const createBaseRoutineArray = () => {
    return [
        "MONDAY", "TUESDAY",
        "WEDNESDAY", "THURSDAY",
        "FRIDAY", "SATURDAY", "SUNDAY"
    ].map( (day, index) => createDayObject(day, index))
}

export {DeserializeTreatment, SerializeTreatment, DeleteTreatment, SerializeRoutine, DeserializeRoutine, createBaseRoutineArray}