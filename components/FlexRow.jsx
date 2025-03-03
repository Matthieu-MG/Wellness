import { StyleSheet, View } from "react-native"

function FlexRow(props) {
    return (
        <View style={styles.flexRow}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create( {
    flexRow : {
        flexDirection: "row",
        rowGap: "2rem",
        flex: 1,
        flexWrap: "wrap",
        padding: "5rem"
    }
})

export default FlexRow;