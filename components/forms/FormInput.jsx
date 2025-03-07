import InterText from "../InterText"
import { TextInput, StyleSheet } from "react-native"

function FormInput({label, name, placeholder, onChangeText}) {
    return(
        <>
            <InterText>{label}</InterText>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={'#a0a0a0'}
                onChangeText={(text) => onChangeText(name, text)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 5,
    }
})

export default FormInput;