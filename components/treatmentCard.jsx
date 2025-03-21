import InterText from "./InterText";
import SplitContainer from "./SplitContainer";
import Card from "./Card"
import { useRouter } from "expo-router";
import { findFrequency } from "../utils/Days";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function TreatmentCard({treatment, deleteTreatment = () => {}}) {
    const router = useRouter();

    const InspectTreatment = (treatment) => {
        console.log("Inspecting ", treatment)
        router.push({
            pathname: "/treatmentDetails",
            params: { data : JSON.stringify(treatment)} 
        })
    }

    const RightAction = () => {
        return (
            <Card color="#F44336" onPress={deleteTreatment}
            >
                <SplitContainer direction="column" alignItems="center" justifyContent="center" padding={50}>
                    <MaterialIcons name="delete-outline" size={24} color="white" />
                </SplitContainer>
            </Card>
        )
    }

    return (
            <Swipeable renderRightActions={RightAction} containerStyle={{width:'100%'}}>
                <Card opacity={1} onPress={() => InspectTreatment(treatment)}>
                            <SplitContainer direction="column" padding={20} gap={10}>
                                <InterText whiteText={true} isBold={true}>{treatment.treatmentName}</InterText>
                                <InterText whiteText={true}>Medications: {treatment.medications.length}</InterText>
                                <InterText whiteText={true}>Times Per Day: {treatment.times.length}</InterText>
                                <InterText whiteText={true}>Frequency: {findFrequency(treatment.frequency).label}</InterText>
                            </SplitContainer>
                </Card>
            </Swipeable>
    )
}

export default TreatmentCard;