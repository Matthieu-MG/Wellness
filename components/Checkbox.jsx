import { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

function Checkbox({value=0, defaultCheck=false, disabled=false, width='2', height='auto', onPress}) {
    const [isChecked, setIsChecked] = useState(defaultCheck);
    
    const Pressed = () => {
        onPress(!isChecked, value)
        setIsChecked(!isChecked)
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center',
         width: width, height: height,
         aspectRatio: 1}}>  
            <TouchableOpacity 
                disabled={disabled}
                style={[styles.checkBox, {width: '50%', backgroundColor: isChecked ? 'orange' : '#00000000'}]}
                onPress={Pressed}
            />
        </View>
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