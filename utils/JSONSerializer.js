import * as FileSystem from 'expo-file-system'

async function SerializeJSON(data, path) {
    
    const fileUri = FileSystem.documentDirectory + path;
    const jsonString  = JSON.stringify(data, null, 2);

    console.log(jsonString)

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

export {DeserializeTreatment, SerializeTreatment}