import { Pressable } from "react-native";

function IconButton({style={}, onPress, children}) {
    return (
        <Pressable style={style} onPress={onPress}>
            {children}
        </Pressable>
    )
}

export default IconButton;