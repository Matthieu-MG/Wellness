import {View} from "react-native"

function SplitContainer({flex=1, gap=30, padding=0, direction='row', wrap=false, children}) {
    return (
        <View flex={flex} style={{
            flexDirection: direction,
            gap: gap,
            width: "100%",
            height: "auto",
            alignItems: "flex-start",
            flexWrap : wrap ? 'wrap' : 'nowrap',
            padding: padding,
            // backgroundColor: "#ff0000"
            }}>

            { children }
        
        </View> 
    )
}

export default SplitContainer;