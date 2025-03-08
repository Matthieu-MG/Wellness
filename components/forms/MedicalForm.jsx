import FormInput from "./FormInput";
import SplitContainer from "../SplitContainer";
import { Button } from "react-native";
import Checkbox from "../Checkbox";
import { useState } from "react";
import InterText from "../InterText";
import CustomButton from "../CustomButton";

function MedicalForm({index, setValue, remove}) {
    const [isAlternating, setIsAlternating] = useState(false);

    const onCheck = (checked, value) => {
        setValue(`medications.${index}.isAlternating`, checked);
        setIsAlternating(checked);
    }

    return(
        <SplitContainer direction="column" gap={5}>
            <FormInput 
                label={'Name'}
                name={`medications.${index}.name`}
                placeholder='Doliprane, Ibuprofen, ...'
                onChangeText={setValue}
            />
            <FormInput
                label={'Dosage'}
                name={`medications.${index}.dosage`}
                placeholder='2 x 500mg, 100ml, ...'
                onChangeText={setValue}
            />

            <SplitContainer direction="column" alignItems="center" gap={0}>
                <InterText>Alternating Medicine</InterText>
                <Checkbox width={50} height={50} onPress={ (checked, value) => onCheck(checked, value) }/>
            </SplitContainer>

            {isAlternating && 
            <>
                <FormInput 
                    label={'Alternate Med: Name'}
                    name={`medications.${index}.alternate.name`}
                    placeholder='Doliprane, Ibuprofen, ...'
                    onChangeText={setValue}
                />
                <FormInput
                    label={'Alternate Med: Dosage'}
                    name={`medications.${index}.alternate.dosage`}
                    placeholder='2 x 500mg, 100ml, ...'
                    onChangeText={setValue}
                />
            </>
            }
            
            <CustomButton title="Remove" onPress={() => remove(index)} 
                backgroundColor="#EF5350"
                isWhite={true}
                textColorChange={false}
                borderColor="#EF5350"   
                pressedColor="#D32F2F" 
                pressedBorderColor="#D32F2F"
            />
        </SplitContainer>
    )
}

export default MedicalForm;