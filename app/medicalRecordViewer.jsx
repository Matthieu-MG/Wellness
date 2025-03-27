import { useLocalSearchParams } from "expo-router";
import FileViewer from "../components/FileViewer";
import { GetMedicalRecordUri } from "../utils/JSONSerializer";

function MedicalRecordViewer() {

    const {data} = useLocalSearchParams();
    const fileName = data ? JSON.parse(data) : null

    if(fileName === null) {
        return <></>
    }

    console.log("Opening file at: ", GetMedicalRecordUri(fileName));

    return (
        <FileViewer uri={GetMedicalRecordUri(fileName)}/>
    )
}

export default MedicalRecordViewer;