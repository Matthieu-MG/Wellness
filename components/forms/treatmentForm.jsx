import { View } from "react-native";
import { useForm, useFieldArray } from "react-hook-form";
import InterText from "../InterText";
import SplitContainer from "../SplitContainer";
import FormInput from "./FormInput";
import MedicalForm from "./MedicalForm";
import DosingScheduleForm from "./DosingScheduleForm";
import { useCallback, useState } from "react";
import DosingFrequencyForm from "./DosingFrequencyForm";
import CustomButton from "../CustomButton";
import { SerializeTreatment } from "../../utils/JSONSerializer";
import { ValidateTreatment } from "../../utils/Validators";
import { useRouter } from "expo-router";
import Checkbox from "../Checkbox";
import Card from "../Card"
import { scheduleTreatmentNotifications } from "../../utils/Notifications";

function TreatmentForm() {
    const router = useRouter();
    const [hasFinishDate, setHasFinishDate] = useState(false);
    const [errorMessages, setErrorMessages] = useState({messages: []});

    const {control, register, handleSubmit, setValue} = useForm({
        defaultValues: {
            treatmentName: "",
            medications: [{ name: "", dosage: "" , isAlternating: false}],
            times:[{hour: "", minute: ""}],
            frequency: '1',
            days:[],
            hasFinishDate: false,
            finishDate: 'dd/mm/yyyy'
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

    const onHasFinishDateChecked = (isChecked, value) => {
        setValue('hasFinishDate', isChecked);
        setHasFinishDate(isChecked);
    }

    const onSubmit = useCallback(async formData => {
        console.log("Submitting");
        
        const response = await ValidateTreatment(formData);
        
        if(response.error) {
            console.log('Failed Validation');
            
            setErrorMessages(response.messages)
            return;
        }

        await SerializeTreatment(formData);
        console.log("Going into Notifications");
        await scheduleTreatmentNotifications(formData);
        console.log("Routing Back");
        router.back();
    }, []);

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
            <CustomButton
                title="Add Medication"
                isWhite={true}
                textColorChange={false}
                borderColor="#66BB6A"
                pressedBorderColor="#388E3C"
                backgroundColor="#66BB6A"
                pressedColor="#388E3C"
                onPress={() => addMedication({ name: "", dosage: "", isAlternating: false })}
            />

            {/* Dosage Schedule */}
            <InterText isBold={true}>Dosage Schedule</InterText>

            <View flex={1} style={{display:"flex", alignItems:"flex-start", width:"100%", height:"auto", gap:20}}>
                {times.map((item, index) => 
                    <DosingScheduleForm key={item.id} index={index} remove={removeTime} setValue={setValue}/>
                )}
            </View>

            {/* Add Time Button */}
            <CustomButton
                title="Add Time"
                isWhite={true}
                textColorChange={false}
                borderColor="#66BB6A"
                pressedBorderColor="#388E3C"
                backgroundColor="#66BB6A"
                pressedColor="#388E3C"
                onPress={() => addTime({ hour: "", minute: ""})}
            />

            {/* Dosing Frequency */}
            <SplitContainer direction="column" gap={0}>
                <InterText isBold={true}>Dosing Frequency</InterText>
                <DosingFrequencyForm fieldArray={days} setFieldValue={setValue} addDay={addDay} removeDay={removeDay}/>
            </SplitContainer>

            <SplitContainer direction="column" gap={0} padding={0}>
                <InterText>Has a Finish Date ?</InterText>
                <Checkbox width="15%" onPress={onHasFinishDateChecked}/>
                {hasFinishDate && 
                    <FormInput label={'Finish Date'} name={'finishDate'} placeholder={'dd/mm/yyyy'} onChangeText={setValue}/>
                }
            </SplitContainer>

            {errorMessages.length > 0 && 
            <Card color='#af0000'>
                <SplitContainer direction="column" gap={5} padding={15}>
                {errorMessages.map((message, index) => 
                {
                    return(
                            <InterText whiteText={true} key={index}>{message}</InterText>
                        )
                    })
                }
                </SplitContainer>
            </Card>
            }

            {/* Submit Button */}
            <CustomButton title="Submit" onPress={handleSubmit(onSubmit)}
                isWhite={true}
                textColorChange={false}
                borderColor="#42A5F5"
                pressedBorderColor="#1976D2"
                backgroundColor="#42A5F5"
                pressedColor="#1976D2"
            />

        </SplitContainer>
    );
}

export default TreatmentForm;