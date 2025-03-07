import { StyleSheet, Button, View } from "react-native";
import { useForm, useFieldArray } from "react-hook-form";
import InterText from "../InterText";
import SplitContainer from "../SplitContainer";
import FormInput from "./FormInput";
import MedicalForm from "./MedicalForm";
import DosingScheduleForm from "./DosingScheduleForm";
import { useCallback } from "react";
import DosingFrequencyForm from "./DosingFrequencyForm";

function TreatmentForm() {
    const {control, register, handleSubmit, setValue} = useForm({
        defaultValues: {
            treatmentName: "",
            medications: [{ name: "", dosage: "" , isAlternating: false}],
            times:[{hour: "", minute: ""}],
            frequency: '1',
            days:[]
        }
    });

    const { fields: medications, append: addMedication, remove: removeMedication } = useFieldArray({
        control,
        name: "medications"
      });

      const { fields: times, append: addTime, remove: removeTime } = useFieldArray({
        control,
        name: "times"
      });

      const { fields: days, append: addDay, remove: removeDay } = useFieldArray({
        control,
        name: "days"
      });

    const onSubmit = useCallback(formData => {
        console.log(formData);
    }, []);

    //! Handle Input form overflow-x
    return(
        <SplitContainer direction="column" gap={10} padding={20}>
            <InterText isTitle={true} isBold={true}>Treatment Form</InterText>

            {/* Treatment Name */}
            <FormInput
                label="Treatment Name"
                name='treatmentName'
                placeholder='Flu Treatment, Acne Routine, ...'
                onChangeText={setValue}
            />

            <InterText isBold={true}>Medications</InterText>
            {/* Medications List */}
            <View flex={1} style={{display:"flex", width:"100%", height:"auto", gap:20}}>
                {medications.map((item, index) => 
                    (<MedicalForm
                        key={item.id || index}
                        index={index}
                        setValue={setValue}
                        remove={removeMedication}
                    />)
                )}
            </View>

            {/* Add Medication Button */}
            <Button
                title="Add Medication"
                onPress={() => addMedication({ name: "", dosage: "" })}
            />

            {/* Dosage Schedule */}
            <InterText isBold={true}>Dosage Schedule</InterText>

            <View flex={1} style={{display:"flex", alignItems:"flex-start", width:"100%", height:"auto", gap:20}}>
                {times.map((item, index) => 
                    <DosingScheduleForm key={item.id} index={index} remove={removeTime} setValue={setValue}/>
                )}
            </View>

            {/* Add Medication Button */}
            <Button
                title="Add Time"
                onPress={() => addTime({ hour: "", minute: "" })}
            />

            {/* Dosing Frequency */}
            <SplitContainer direction="column" gap={0}>
                <InterText isBold={true}>Dosing Frequency</InterText>
                <DosingFrequencyForm setFieldValue={setValue} addDay={addDay} removeDay={removeDay}/>
            </SplitContainer>

            {/* Comments (Should be bold and multiline) */}
            <FormInput label={'Comments (Optional)'}/>

            {/* Submit Button */}
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />

        </SplitContainer>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 5,
    }
})

export default TreatmentForm;