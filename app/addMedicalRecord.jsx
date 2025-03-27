import { ScrollView } from "react-native";
import AppContainer from "../components/AppContainer";
import InterText from "../components/InterText";
import MedicalRecordForm from "../components/forms/MedicalRecordForm";

function AddMedicalRecord() {
    return (
        <AppContainer color="#8C9EFF">

            <InterText isBold={true} isTitle={true} whiteText={true}>Add Record</InterText>

            <ScrollView
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: 'white'
                }}
                contentContainerStyle={{
                    height: "100%",
                    width: "100%",
                    padding: 20
                }}
            >
                <MedicalRecordForm/>
            </ScrollView>
        </AppContainer>
    )
}

export default AddMedicalRecord;