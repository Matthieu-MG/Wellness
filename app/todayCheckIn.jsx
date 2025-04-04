import AppContainer from "../components/AppContainer";
import Card from "../components/Card";
import InterText from "../components/InterText";
import SplitContainer from "../components/SplitContainer";
import { getRoutineDay } from "../utils/Days";
import { useRoutineStore, useTreatmentsStore } from "../utils/GlobalStateManager";
import Checkbox from '../components/Checkbox'
import { workoutCardFactory } from "../components/Workout";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";

export default function TodayCheckIn() {
    const treatments = useTreatmentsStore((state) => state.treatments)
    const routine = useRoutineStore((state) => state.routine);
    const router = useRouter();

    const workout = {
        id: routine[getRoutineDay()].workoutId,
        name: routine[getRoutineDay()].workoutName
    }

    return (
        <AppContainer color="#4FC3F7">
            <InterText whiteText={true} isBold={true} isTitle={true}>Today's Check In</InterText>

            <ScrollView
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: 'white',
                }}
                contentContainerStyle={{
                    height: "100%",
                    width: "100%",
                    padding: 20,
                    display: 'flex',
                    gap: 20
                }}
            >
                <SplitContainer direction="column" gap={10}>
                <InterText isBold={true}>Meds</InterText>

                {treatments.map((t, index) => {
                    return (
                        <Card key={index} opacity={1}>
                            <SplitContainer direction="column" padding={20} gap={10}>
                                <InterText whiteText={true}>{t.treatmentName}</InterText>
                                <CustomButton title={'Inspect'} backgroundColor="orange" borderColor="orange" pressedBorderColor="orange" pressedColor="white" textColorChange={false} isWhite={true} onPress={() => {
                                    router.push({
                                        pathname: "/treatmentDetails",
                                        params: { data : JSON.stringify(t)} 
                                    })
                                }}/>
                                {t.times.map((time, j) => {
                                    return (
                                        <SplitContainer key={j} direction="row" alignItems="center" wrap="wrap" gap={0}>
                                            <Checkbox width="40" disableOnPress={true}/>
                                            <InterText whiteText={true}>{time.hour + " : " + time.minute}</InterText>
                                        </SplitContainer>
                                    )
                                })}
                            </SplitContainer>
                        </Card>
                    )
                })}
                </SplitContainer>

                <SplitContainer direction="column" gap={10}>
                    <InterText isBold={true}>Workout</InterText>
                    { workout.id < 0 ? <InterText>No Workout for today</InterText> : workoutCardFactory(false, ()=>{}, workout, 0,  router) }
                </SplitContainer>
            </ScrollView>
        </AppContainer>
    )
}