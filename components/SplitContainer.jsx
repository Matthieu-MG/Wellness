import {View} from "react-native"

function SplitContainer(props) {
    return (
        <View flex={1} style={ {flexDirection: 'row', gap: 20} }>
            { props.children }
        </View> 
    )
}

export default SplitContainer