import { TouchableOpacity } from "react-native";
import SplitContainer from "./SplitContainer";
import InterText from "./InterText";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useState } from "react";
import Card from "./Card";

function Collapsible({width = "100%", color = "white", title="Collapsible", children}) {
    
    const [collapsed, setCollapsed] = useState(false);

    const touchableStyle = {
        width: width,
        backgroundColor: color,
        borderRadius: 10,
        borderWidth: 0.5,
    }

    const collapsedPressed = () => setCollapsed(!collapsed);
    
    return(
        <Card color={color}>
            <TouchableOpacity style={touchableStyle} onPress={collapsedPressed}>
                <SplitContainer padding={10} gap={0} justifyContent="space-around">
                    <InterText isBold={true}>{title}</InterText>
                    <SimpleLineIcons name="arrow-down" size={24} color="black"/>
                </SplitContainer>
            </TouchableOpacity>
            { collapsed && children }
        </Card>
    )
}

export default Collapsible;