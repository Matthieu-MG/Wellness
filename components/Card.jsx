import { StyleSheet, TouchableOpacity, View } from "react-native";

function Card({flex = 1, color = '#DCEDC8', onPress, children}) {
    return (
        <TouchableOpacity
        style={[styles.card, {backgroundColor: color}]}
        onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    card: {
        width: "100%",
        borderRadius: 0,
        gap: 10,
        alignItems: "flex-start",

        borderWidth: 0.5,
        backgroundColor: '#B2FF5F',
        boxShadow : "5 5 1 grey"
    },
}
);

export default Card;