import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Inter_900Black, Inter_400Regular, useFonts } from "@expo-google-fonts/inter";

function Card({flex = 1, color = '#B2FF5F',children}) {
    return (
        <TouchableOpacity
        style={[styles.card, {flex: flex, backgroundColor: color}]}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    card: {
        flex: 0,
        flexShrink: 1,
        width: "100%",
        height: "auto",
        borderRadius: 35,
        gap: 10,
        minHeight: 100,
        maxHeight: 250,
        justifyContent: "center",
        alignItems: "flex-start",

        borderWidth: 0,
        backgroundColor: '#B2FF5F',
        boxShadow : "4 4 10 white"
    },
    text: {
        textAlign: "center",
        padding: 0,
        fontFamily: "Inter_900Black",
        fontSize: 30,
    },
    textBlack: {
        color: '#050505'
    },
    textWhite: {
        color: '#FFFFFF'
    },
    header : {
        fontSize: 20,
        fontWeight: "600"
    },
    body: {
        fontSize: 15,
        fontFamily: "Inter_400Regular",
        fontWeight: "400"
    }
}
);

export default Card;