import { useForm, useFieldArray } from "react-hook-form";
import FormInput from "./FormInput";
import SplitContainer from "../SplitContainer";
import SearchExercise from "../SearchExercise";
import { useCallback } from "react";
import { mapExerciseType, mapMuscle } from "../../utils/Exercises";
import Card from "../Card";
import InterText from "../InterText";
import Collapsible from "../Collapsible";
import IconButton from "../IconButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomButton from "../CustomButton";
import { AddWorkout } from "../../utils/DatabaseAccess";

function WorkoutDayForm() {
    // Days
    const {control, handleSubmit, setValue} = useForm({
        defaultValues: {
            name: "Workout Day",
            exercises: []
        }
    })

    const {fields: exercises, append: addExercise, remove: removeExercise} = useFieldArray({
        control: control,
        name: "exercises"
    })

    const onAddExercises = (newExercises) => {
        newExercises = newExercises
        .filter(newExo => {
                return !exercises.some(existingExo => {
                    return existingExo.dbId === newExo.id 
                })
            }
        )
        .map(exo => ({...exo, dbId: exo.id, sets: 3, reps: 3, weight: "5kg"}));

        //* Note the use of dbId property above, this is to prevent conflicts with react-hook-form id property
        //* This is useful when ensuring no duplicates is added

        addExercise(newExercises);
    }

    const onRemoveExo = (index) => {
        removeExercise(index);
    }

    //* Remember to use dbId instead of id for the exercises primary key
    const onSubmit = useCallback(async formData => {
        for (let i = 0; i < formData.exercises.length; i++) {
            formData.exercises[i].id = formData.exercises[i].dbId;
        }
        console.log(`formData workout: ${JSON.stringify(formData, null, 2)}`)
        AddWorkout(formData);
    }, []);

    return (
        <SplitContainer direction="column" gap={25}>
            <InterText isBold={true} isTitle={true}>Workout Day Form</InterText>

            <FormInput 
                label={'Name'}
                name={`name`}
                placeholder='Push day 1, Pull day 3, Legs, Rest, ...'
                onChangeText={setValue}
            />

            <Collapsible title="Search Exercises">
                <SplitContainer direction="column" padding={20}>
                    <SearchExercise onAdd={onAddExercises}/>
                </SplitContainer>
            </Collapsible>

            <Card>
                <SplitContainer direction="column" padding={20} gap={10}>
                    <InterText isBold={true}>Exercises</InterText>
                    {exercises.length === 0 && <InterText>No Exercise Yet</InterText>}
                    <SplitContainer direction="column" gap={0} padding={0}>
                        { exercises.map( (exercise, index) => {
                                return (
                                    <Card key={exercise.id} color="white">
                                        <SplitContainer gap={0} padding={10}>

                                            <SplitContainer flex={1} direction="column" padding={0} gap={40}>
                                                <SplitContainer direction="column" gap={5}>
                                                    <InterText isBold={true}>{exercise.name}</InterText>
                                                    <InterText fontSize={10}>{exercise.isCompound == true ? "Compound" : mapMuscle(exercise.muscleGroup)}</InterText>
                                                    <InterText fontSize={10}>{mapExerciseType(exercise.type)}</InterText>
                                                </SplitContainer>
                                                <IconButton onPress={() => onRemoveExo(index)}>
                                                    <MaterialIcons name="highlight-remove" size={84} color="red" />
                                                </IconButton>
                                            </SplitContainer>
                                            
                                            <SplitContainer flex={1} direction="column" padding={0} gap={5}>
                                                <FormInput label={"Sets"} name={`exercises.${index}.sets`} placeholder={"1, 2, 3, ..."} onChangeText={setValue}/>
                                                <FormInput label={"Reps"} name={`exercises.${index}.reps`} placeholder={"6, 9, 12, ..."} onChangeText={setValue}/>
                                                <FormInput label={"Weight"} name={`exercises.${index}.weight`} placeholder={"10kg, Bodyweight, ..."} onChangeText={setValue}/>
                                            </SplitContainer>

                                        </SplitContainer>
                                    </Card>
                                )
                            }
                        )}
                    </SplitContainer>
                </SplitContainer>
            </Card>

            <CustomButton title={"Submit"} onPress={handleSubmit(onSubmit)}/>
        </SplitContainer>
    )
}

export default WorkoutDayForm;