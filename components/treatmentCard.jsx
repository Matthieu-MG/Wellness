import InterText from "./InterText";
import SplitContainer from "./SplitContainer";
import Card from "./Card"
import { useRouter } from "expo-router";
import { findFrequency } from "../utils/Days";

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
                <InterText whiteText={true} isBold={true}>{treatment.treatmentName}</InterText>
                <InterText whiteText={true}>Medications: {treatment.medications.length}</InterText>
                <InterText whiteText={true}>Times Per Day: {treatment.times.length}</InterText>
                <InterText whiteText={true}>Frequency: {findFrequency(treatment.frequency).label}</InterText>
            </SplitContainer>
        </Card>
    )
}

export default TreatmentCard;