import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

function Checkbox({value=0, width='2', height='2', onPress}) {
    const [isChecked, setIsChecked] = useState(false);

    const Pressed = () => {
        onPress(!isChecked, value)
        setIsChecked(!isChecked)
    }

    return (
        <TouchableOpacity 
            style={[styles.checkBox, {width: width, height: height, backgroundColor: isChecked ? 'orange' : '#00000000'}]}
            onPress={Pressed}
        />
    )
}

const styles = StyleSheet.create({
    checkBox: {
        aspectRatio: 1,
        borderRadius: 40,
        borderColor: 'orange',
        borderWidth: 1,
    }
})

export default Checkbox;