import AppContainer from "../components/AppContainer"
import InterText from "../components/InterText"
import SplitContainer from "../components/SplitContainer"
import Card from "../components/Card"
import { useLocalSearchParams } from "expo-router"
import { ScrollView } from "react-native"

function treatmentDetails() {
    const { data } = useLocalSearchParams();
    console.log(data);
    console.log(useLocalSearchParams());
    const treatment = data ? JSON.parse(data) : null

    if(treatment === null) {
        return (
            <AppContainer>
            </AppContainer>
        )
    }

    return(
        <AppContainer>
            <ScrollView style={{height: "100%", width: "100%"}}
            contentContainerStyle={{
                alignItems:'flex-start',
                gap: '15'
            }}>
            <InterText isTitle={true} isBold={true}>{treatment.treatmentName}</InterText>
            <InterText isBold={true}>Medications</InterText>
            {treatment.medications.map( (med, index) => {
                return(
                    <Card key={index}>
                        <SplitContainer direction="column" gap={20} padding={20}>
                            <InterText>Name: {med.name}</InterText>
                            <InterText>Dosage: {med.dosage}</InterText>
                            <InterText>Has Alternating Medicine: {med.isAlternating ? "true" : "false"}</InterText>
                            {med.isAlternating && med.alternate.name && med.alternate.dosage && (
                                <>
                                    <InterText>Alternate Med Name: {med.alternate.name}</InterText>
                                    <InterText>Alternate Med Dosage: {med.alternate.dosage}</InterText>
                                </>
                            )}
                        </SplitContainer>
                    </Card>
                    )
                }
            )}
        </ScrollView>
        </AppContainer>
    )
}

export default treatmentDetails;