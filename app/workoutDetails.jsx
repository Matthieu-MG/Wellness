import { ScrollView } from "react-native";
import AppContainer from "../components/AppContainer";
import InterText from "../components/InterText";
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import { GetWorkoutExercises } from "../utils/DatabaseAccess";

function WorkoutDetails() {
    const { data } = useLocalSearchParams();
    const workout = data ? JSON.parse(data) : null;
    console.log(workout);
    const [exos, setExos] = useState([]);

    if(workout === null) {
        return (
            <AppContainer>
            </AppContainer>
        )
    }

    useEffect( () => {
        //* Get Data
        const LoadExos = async () => {
            const workoutExos =  await GetWorkoutExercises(workout.id);
            if (!Array.isArray(workoutExos)) {
                workoutExos = [];
            }  
            console.log("WorkoutExos: ", workoutExos);
            setExos(workoutExos);
        }

        LoadExos();
    }, [])

    return (
        <AppContainer color="white">
            <ScrollView style={{height: "100%", width: "100%"}}
            contentContainerStyle={{
                alignItems:'flex-start',
                gap: '15'
            }}>

                <InterText isTitle={true} isBold={true}>{workout.name}</InterText>

                { exos.map((exo, index) => {
                    return (
                        <ExerciseCard key={exo.id} showWorkoutDetails={true} exo={exo}/>
                    )
                }) }

            </ScrollView>
        </AppContainer>
    )
}

export default WorkoutDetails;