import FormInput from "./FormInput";
import SplitContainer from "../SplitContainer";
import { Button } from "react-native";

function MedicalForm({index, setValue, remove}) {
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
            <Button title="Remove" onPress={() => remove(index)} />
        </SplitContainer>
    )
}

export default MedicalForm;