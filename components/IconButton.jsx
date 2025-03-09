import { Pressable } from "react-native";

function IconButton({onPress, children}) {
    return (
        <Pressable onPress={onPress}>
            {children}
        </Pressable>
    )
}

export default IconButton;