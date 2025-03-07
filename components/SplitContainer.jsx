import {View} from "react-native"

function SplitContainer({flex=1, gap=30, padding=0, direction='row', wrap=false, 
                         alignItems='flex-start', justifyContent = 'flex-start',children}) {
    return (
        <View flex={flex} style={{
            display: 'flex',
            flexDirection: direction,
            gap: gap,
            width: "100%",
            height: "auto",
            alignItems: alignItems,
            justifyContent: justifyContent,
            flexWrap : wrap ? 'wrap' : 'nowrap',
            padding: padding,
            borderWidth: 0.1, // Used to fix a weird bug on Huawei phones for flex wrapping, do not remove
            borderColor: 'transparent' // Same applies here
            }}>

            { children }
        
        </View> 
    )
}

export default SplitContainer;