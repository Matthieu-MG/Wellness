import AppContainer from "../components/AppContainer";
import InterText from "../components/InterText";
import SplitContainer from "../components/SplitContainer";
import { ScrollView } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'
import IconButton from "../components/IconButton";
import { useRouter } from "expo-router";
import { useEffect } from "react";

function EntityDisplay({
                        title='Title', emptyText='No Entity Added Yet', addRoute='/',
                        entityCardFactory = () => {}, entities = [], bgColor='#4FC3F7',
                        loadEntities = () => {}
                    }) {

    const router = useRouter();

    useEffect(() => {
        loadEntities();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <AppContainer color={bgColor}>
            <SplitContainer direction="column" justifyContent="center">
                <InterText whiteText={true} isBold={true} isTitle={true}>{title}</InterText>
                <ScrollView style={{
                                    display: 'flex',
                                    width: '100%',
                                    height:'100%',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: 5}}
                            contentContainerStyle={{padding: 20, alignItems:'center', gap:20}}
                >
                    { entities.length === 0 && 
                        ( <InterText isBold={true}>{emptyText}</InterText>)
                    }

                    {/* Renders every entity */}
                    { entities.length > 0 && entities.map( (entity, index) => {
                        return (
                            entityCardFactory(entity, index)
                        )
                    })}

                    {/* Add Entity Button */}
                    <IconButton onPress={() => router.push(addRoute)}>
                        <MaterialIcons name='add-circle-outline' size={35}/>
                    </IconButton>
                </ScrollView>
            </SplitContainer>
        </AppContainer>
    )
}

export default EntityDisplay;