import SplitContainer from "./SplitContainer"
import InterText from "./InterText"
import Card from "./Card"
import { mapExerciseType, mapMuscle } from "../utils/Exercises";

function ExerciseCard({exo=NaN, showWorkoutDetails=false}) {
    
    if(!exo) {
        return <></>
    }

    return (
        <Card key={exo.name} color={'orange'}>
            <SplitContainer padding={10}>

            <SplitContainer flex={1} direction="column" alignItems="flex-start" justifyContent="flex-start" gap={1}>
                <InterText whiteText={true} isBold={true}>{exo.name}</InterText>
                <InterText whiteText={true} fontSize={10}>{exo.isCompound == true ? "Compound" : mapMuscle(exo.muscleGroup)}</InterText>
                <InterText whiteText={true} fontSize={10}>{mapExerciseType(exo.type)}</InterText>
            </SplitContainer>

            {showWorkoutDetails && 
            <SplitContainer flex={1} gap={1} direction="column" alignItems="flex-end">
                <InterText whiteText={true}>Sets :{exo.sets}</InterText>
                <InterText whiteText={true}>Reps :{exo.reps}</InterText>
                <InterText whiteText={true}>Weight :{exo.weight}</InterText>
            </SplitContainer>}

            </SplitContainer>
        </Card>
    )
}

export default ExerciseCard;