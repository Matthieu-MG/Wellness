import { ScrollView } from "react-native";
import AppContainer from "../components/AppContainer";
import Collapsible from "../components/Collapsible";
import SearchWorkout from "../components/SearchWorkout"
import SplitContainer from "../components/SplitContainer";
import Card from "../components/Card";
import InterText from "../components/InterText";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { SerializeRoutine, DeserializeRoutine, createBaseRoutineArray } from "../utils/JSONSerializer";

function workoutRoutine() {
    
    const [days, setDays] = useState(createBaseRoutineArray());
    
    useEffect(() => {
        const readRoutine = async () => {
            const routine = await DeserializeRoutine();
            setDays(routine);
        }

        readRoutine();
    }, [])

    const bindWorkoutToDay = (day, id, name) => {
        const newDays = [...days]
        newDays[day].workoutId = id;
        newDays[day].workoutName = name;

        setDays(newDays);
    }

    const updateRoutine = () => {
        //* Serialize days into JSON file
        const serialize = async () => {
            await SerializeRoutine(days)
        }

        serialize();
    }

    return (
        <AppContainer color='orange'>
            <InterText isTitle={true} whiteText={true} isBold={true}>Workout Routine</InterText>

            <ScrollView style={{height: "100%", width: "100%", backgroundColor: 'white'}}
                    contentContainerStyle={{
                        alignItems:'flex-start',
                        gap: '15'
            }}>
                <SplitContainer direction="column" padding={20} gap={20}>

                    <Collapsible title="Assign Workout" color="orange">
                        <SearchWorkout data={days} Bind={bindWorkoutToDay}/>
                    </Collapsible>

                    <SplitContainer direction="column" gap={20}>
                        {days.map((day, index) => {
                            return (
                                <SplitContainer key={index} direction="row" gap={0}>
                                    <SplitContainer flex={1} direction="column" gap={0}>
                                        <InterText isBold={true}>{day.label}</InterText>
                                        <InterText>{day.workoutName}</InterText>
                                    </SplitContainer>
                                    {day.workoutId !== -1 &&
                                        <SplitContainer flex={1} direction="column" gap={0}>
                                            <CustomButton title={"REST"} onPress={() => {bindWorkoutToDay(index, -1, "REST")}}/>
                                        </SplitContainer> 
                                    }
                                </SplitContainer>
                            )
                        })}
                    </SplitContainer>

                    <CustomButton title={'UPDATE'} onPress={updateRoutine}/>
                </SplitContainer>
            </ScrollView>
        </AppContainer>
    )
}

export default workoutRoutine;