import InterText from "./InterText";
import SplitContainer from "./SplitContainer";
import Card from "./Card"
import { useRouter } from "expo-router";

function TreatmentCard({treatment}) {
    const router = useRouter();

    const InspectTreatment = (treatment) => {
        console.log("Inspecting ", treatment)
        router.push({
            pathname: "/treatmentDetails",
            params: { data : JSON.stringify(treatment)} 
        })
    }

    return (
        <Card onPress={() => InspectTreatment(treatment)}>
            <SplitContainer direction="column" padding={20} gap={10}>
                <InterText isBold={true}>{treatment.treatmentName}</InterText>
                <InterText>Medications: {treatment.medications.length}</InterText>
                <InterText>Times Per Day: {treatment.times.length}</InterText>
                <InterText>Frequency: {treatment.frequency}</InterText>
            </SplitContainer>
        </Card>
    )
}

export default TreatmentCard;