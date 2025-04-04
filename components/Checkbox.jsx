import { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

function Checkbox({value=0, defaultCheck=false, disabled=false, width='2', height='auto', disableOnPress=false, onPress=()=>{}}) {
    const [isChecked, setIsChecked] = useState(defaultCheck);
    const [isDisabled, setIsDisabled] = useState(false);
    
    const Pressed = () => {
        onPress(!isChecked, value)
        setIsChecked(!isChecked)

        if(disableOnPress) {
            setIsDisabled(true);
        }
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center',
         width: width, height: height,
         aspectRatio: 1}}>  
            <TouchableOpacity 
                disabled={disabled || isDisabled}
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