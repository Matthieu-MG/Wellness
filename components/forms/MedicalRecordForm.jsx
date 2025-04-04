import { useForm } from "react-hook-form";
import SplitContainer from "../SplitContainer";
import FormInput from "./FormInput";
import CustomButton from "../CustomButton";
import * as DocumentPicker from 'expo-document-picker';
import { TextInput } from "react-native";
import InterText from "../InterText";
import { useCallback, useState } from "react";
import { AddMedicalRecord } from "../../utils/DatabaseAccess";
import { useRouter } from "expo-router";
import Card from "../Card";

function MedicalRecordForm() {
    const router = useRouter();
    const [errors, setErrors] = useState([]);

    const {handleSubmit, setValue} = useForm({defaultValues: {
        name: "BaseName",
        uri: "BaseURI",
        mimeType: "",
        description: ""
    }})

    const add = () => {
        const getFileAsync = async () => {
            const result = await DocumentPicker.getDocumentAsync();
            if(!result.canceled) {
                setValue("uri", result.assets[0].uri);
                setValue("mimeType", result.assets[0].mimeType);
            }
        }

        getFileAsync();
    }

    const onSubmit = useCallback(async formData => {

        try {

            console.log(JSON.stringify(formData, null, 2));
            const response = await AddMedicalRecord(formData);
            console.log(response);
            
            
            if(response.ok) {
                router.back();
            }
            
            else {
                setErrors(response.messages)
            }
        }

        catch(error) {
            console.error("ERROR from Submission of MedicalRecordForm: ", error);
            setErrors(["Unexpected Error occured"]);
        }
    }, [])

    return (
        <SplitContainer direction="column" gap={10}>
            <FormInput
                label={'Name'}
                name={'name'}
                placeholder={'Blood Test Result, ...'}
                onChangeText={setValue}
            />

            <CustomButton title={'Select file'} isWhite={true} backgroundColor="orange" borderColor="white" pressedColor="white" onPress={add}/>

            <SplitContainer direction="column" gap={5}>
                <InterText>Description</InterText>
                <TextInput multiline={true} onChangeText={(text) => setValue("description", text)}
                    style={{
                        width: "100%",
                        height: 40,
                        borderWidth: 1,
                        paddingHorizontal: 5,
                    }}
                />
            </SplitContainer>

            <CustomButton title={'Add'} isWhite={true} backgroundColor="#4FC3F7" padding={3} borderColor="white" pressedColor="white" onPress={handleSubmit(onSubmit)}/>

            { errors.length !== 0 && 
                <Card color="red">
                    <SplitContainer gap={10} padding={10} direction="column">
                        { errors.map((e, index) => <InterText key={index} whiteText={true} >{e}</InterText>) }
                    </SplitContainer>
                </Card>
            }
        </SplitContainer>
    );
}

export default MedicalRecordForm