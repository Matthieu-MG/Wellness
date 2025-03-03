import { Text, View, StyleSheet } from "react-native";

function Card({header = "Card Header", body = "body", flex = 1, color = '#B2FF59'}) {
    return (
        <View style={[styles.card, {flex: flex, backgroundColor: color}]}>
            <Text style={[styles.text, styles.header]}>{header}</Text>
            {body != "" && <Text style={[styles.text, styles.body]}>{body}</Text>}
        </View>
    )
}

//! PADDING on text causing overflow problems, using justify instead
const styles = StyleSheet.create( {
    card: {
        flex: 0,
        flexShrink: 1,
        backgroundColor: '#B2FF59',
        width: "100%",
        height: "auto",
        borderRadius: 35,
        gap: 15,
        minHeight: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        padding: 0,
        fontSize: 30,
        color: '#050505',
    },
    header : {
        fontSize: 15,
        fontWeight: "600",
        // paddingTop: 20
    },
    body: {
        // paddingTop: 5,
        fontSize: 15,
        fontWeight: "300"
    }
}
);

export default Card;