import { Pressable, StyleSheet } from "react-native";
import InterText from "./InterText";

function CustomButton({
      backgroundColor='white', pressedColor='black',
      borderColor='#050505', pressedBorderColor='#050505',
      isWhite = false, textColorChange = true,
      title, onPress
    }) {

    return (
        <Pressable style={({pressed}) => [{
                backgroundColor: pressed ? pressedColor : backgroundColor,
                borderColor: pressed ? pressedBorderColor : borderColor
            }, style.btn ]
        } 
        onPress={onPress}>
            {({pressed}) => (
                textColorChange ?
                 <InterText whiteText={isWhite ? !pressed : pressed} padding={5}>{title}</InterText> :
                 <InterText whiteText={isWhite} padding={5}>{title}</InterText>
            )}
        </Pressable>
    )
}

const style = StyleSheet.create({
    btn : {
        borderWidth: 2,
        borderRadius: 12,
    }
});

export default CustomButton;