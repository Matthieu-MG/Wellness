import { useState } from "react";
import EntityDisplay from "../components/EntityDisplay";
import { GetWorkouts } from "../utils/DatabaseAccess";
import Card from "../components/Card";
import InterText from "../components/InterText";
import SplitContainer from "../components/SplitContainer";
import { useRouter } from "expo-router";

function workoutDisplay() {
    const router = useRouter();
    const [workouts, setWorkouts] = useState([])

    const workoutCardFactory = (workout, index) => {
        const color = index % 2 === 0 ? 'orange' : 'red'

        const data = {
            id : workout.id,
            name : workout.name
        }

        return (
            <Card key={index} color={color} 
                onPress={() => router.push( {pathname : '/workoutDetails', params: {data : JSON.stringify(data)}} )}
            >
                <SplitContainer padding={40} gap={0} justifyContent="center">
                    <InterText whiteText={true}>{workout.name}</InterText>
                </SplitContainer>
            </Card>
        )
    }

    const loadWorkouts = async () => {
        const workouts = await GetWorkouts();
        setWorkouts(workouts)
    }

    return <EntityDisplay
        title="Workouts"
        emptyText="No Workouts Added Yet"
        bgColor="orange"
        addRoute='/addWorkout'
        entities={workouts}
        entityCardFactory={workoutCardFactory}
        loadEntities={loadWorkouts}
    />
}

export default workoutDisplay;