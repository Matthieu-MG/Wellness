import { ScrollView } from "react-native";
import AppContainer from "../components/AppContainer";
import MedicalRecordsDisplay from "../components/MedicalRecordsDisplay";
import InterText from "../components/InterText";
import IconButton from "../components/IconButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function MedicalRecords() {
    const router = useRouter();

    return (
        <AppContainer color="#4FC3F7">

            <InterText isBold={true} isTitle={true} whiteText={true}>Medical Records</InterText>

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
                <MedicalRecordsDisplay/>
                <IconButton 
                    onPress={() => router.push('/addMedicalRecord')}
                    style={{position: 'absolute', bottom: "3%", right: "10%"}}
                >
                    <Ionicons name="add-circle-outline" size={50} color="black" />
                </IconButton>
            </ScrollView>
        </AppContainer>
    )
}

export default MedicalRecords;