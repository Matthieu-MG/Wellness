import { Inter_400Regular, Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import { Text, StyleSheet } from "react-native";

function InterText({whiteText=false, isBold=false, isTitle=false, children}) {
    
    const [loaded, error] = isBold ? useFonts({Inter_900Black}) : useFonts({Inter_400Regular});

    if(!loaded) {
        return (
            <Text>Font not loaded</Text>
        )
    }

    const font = {
        fontFamily: isBold ? "Inter_900Black" : "Inter_400Black",
        fontSize: isTitle ? 30 : 15
    }

    return (
        <Text style={[styles.text, whiteText ? styles.textWhite : styles.textBlack, font]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        padding: 0,
        fontSize: 30,
    },
    textBlack: {
        color: '#050505'
    },
    textWhite: {
        color: '#FFFFFF'
    }
})

export default InterText;