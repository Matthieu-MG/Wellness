import SplitContainer from "../SplitContainer";
import FormInput from "./FormInput";
import InterText from "../InterText";
import { useFieldArray, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown"
import CustomButton from "../CustomButton";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { MuscleGroups ,ExerciseType } from "../../utils/Exercises";
import Checkbox from "../Checkbox";
import { AddExercise } from "../../utils/DatabaseAccess"

function ExerciseForm() {
    const [type, setType] = useState(1)

    const {control, handleSubmit, setValue} = useForm({
        defaultValues: {
            name: "", // Name
            muscleGroup: [], // [Muscles] , Compound
            type: 1 // Strength, Conditioning, Mobility, Rehab
        }
    })

    const {fields: muscles, append: addMuscleGroup, remove: removeMuscleGroup} = useFieldArray({
        control: control,
        name: "muscleGroup"
    });

    const checkboxHandler = (checked, value) => {
        if(checked) {
          addMuscleGroup({muscle: value})
        }
        else {
          const index = muscles.findIndex(m => m.muscle === value)
          index !== -1 ? removeMuscleGroup(index) : console.log('ERROR (from ExerciseForm): Could Not Find Index to Remove')
        }
    }

    const onSubmit = useCallback(async formData => {
        // TODO Perform Validation first
        console.log(JSON.stringify(formData, null, 2))
        AddExercise(formData);
    })

    return (
        <SplitContainer direction="column" padding={20} gap={20}>
            <InterText isBold={true} isTitle={true} >Exercise Form</InterText>
            <SplitContainer direction="column" gap={10}>
                <FormInput label="Name" name={"name"} placeholder={"Bench Press, Lat Pulldown, Deadlift, ..."} onChangeText={setValue}/>

                {/* Muscle Group */}
                <InterText isBold={true}>Muscle Groups</InterText>
                <SplitContainer direction="column" gap={10}>
                    { MuscleGroups.map( (m, index) => {
                            return (
                                <SplitContainer key={m.value} alignItems="center" gap={2}>    
                                    <Checkbox value={m.value} width="10%" onPress={checkboxHandler}/>
                                    <InterText>{m.label}</InterText>
                                </SplitContainer>
                            )
                        }) 
                    }
                </SplitContainer>

                {/* Type of Exercise */}
                <InterText isBold={true}>Exercise Type</InterText>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={ExerciseType}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Strength"
                    value={type}
                    onChange={item => {
                        setValue('type', item.value);
                        setType(item.value);
                        }}
                />

                <FormInput label={"Description"}/>

                <CustomButton onPress={handleSubmit(onSubmit)} title={"Create Exercise"}/>
            </SplitContainer>
        </SplitContainer>
    )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      width: 130,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
});

export default ExerciseForm;