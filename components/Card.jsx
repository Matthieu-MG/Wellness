import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Inter_900Black, Inter_400Regular, useFonts } from "@expo-google-fonts/inter";

function Card({header = "Card Header", body = "body", flex = 1, color = '#B2FF5F', isBlack=true, children}) {
    const [loaded, error] = useFonts({Inter_900Black})
    const [loaded1, error1] = useFonts({Inter_400Regular})

    const textColor = isBlack ? styles.textBlack : styles.textWhite;

    return (
        <TouchableOpacity 
        intensity={100} tint="light"
        style={[styles.card, {flex: flex, backgroundColor: color}]}>
            <View style={{flexDirection: "row", gap:10, justifyContent:"center", alignContent:"center"}}>
                {children}
                {header != "" &&  <Text adjustsFontSizeToFit={true} style={[styles.text, styles.header, textColor]}>{header}</Text>}
            </View>
            {body != "" && <Text adjustsFontSizeToFit={true} style={[styles.text, styles.body, textColor]}>{body}</Text>}
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
        justifyContent: "center",
        alignItems: "center",

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