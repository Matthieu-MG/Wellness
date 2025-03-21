import AppContainer from "../components/AppContainer";
import InterText from "../components/InterText";
import SplitContainer from "../components/SplitContainer";
import Card from "../components/Card";
import { ScrollView } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'
import IconButton from "../components/IconButton";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { DeserializeTreatment, DeleteTreatment } from "../utils/JSONSerializer";
import TreatmentCard from "../components/treatmentCard";

function Treatments() {

    const [treatments, setTreatments] = useState([]);
    const router = useRouter();

    // Load treatments data asynchronously
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await DeserializeTreatment('treatments.json');
                setTreatments(data);
            } catch (error) {
                console.error("Error loading treatments:", error);
            }
        };
        loadData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const deleteTreatment = (index) => {
        const SetTreatmentsAsync = async () => {
            const newTreatments = await DeleteTreatment([...treatments], index);
            setTreatments(newTreatments);
        }

        SetTreatmentsAsync();
    }

    return (
        <AppContainer color={'#4FC3F7'}>
            <SplitContainer direction="column" justifyContent="center">
                <InterText whiteText={true} isBold={true} isTitle={true}>Treatments</InterText>
                <ScrollView style={{
                                    display: 'flex',
                                    width: '100%',
                                    height:'100%',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: 5}}
                            contentContainerStyle={{padding: 20, alignItems:'center', gap:20}}
                >
                    { treatments.length === 0 && 
                        ( <InterText isBold={true}>No Treatments Added Yet</InterText>)
                    }

                    {/* Renders every treatment */}
                    { treatments.length > 0 && treatments.map( (treatment, index) => {
                        return (
                            <TreatmentCard key={treatment.treatmentName} treatment={treatment} deleteTreatment={() => deleteTreatment(index)}/>
                        )
                    })}

                    {/* Add Treatment Button */}
                    <IconButton onPress={() => router.push('/addTreatment')}>
                        <MaterialIcons name='add-circle-outline' size={35}/>
                    </IconButton>
                </ScrollView>
            </SplitContainer>
        </AppContainer>
    )
}

export default Treatments;