import { useEffect, useState } from "react";
import { GetMedicalRecords } from "../utils/DatabaseAccess"
import SplitContainer from "./SplitContainer";
import InterText from "./InterText"
import Card from "./Card"
import { router } from "expo-router";

function MedicalRecordsDisplay() {
    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        const SetMedicalRecordsAsync = async () => {
            setMedicalRecords(await GetMedicalRecords());
        }

        SetMedicalRecordsAsync();
    }, [])

    const openRecord = (uri) => {
        console.log("Attempting to open file at URI: ", uri);
        
        router.push({
            pathname: './medicalRecordViewer',
            params: { data: JSON.stringify(uri) }
        });
    }

    return (
        <SplitContainer direction="column" justifyContent="center" alignItems="center" gap={0}>
            
            { medicalRecords.map((m) => {
                return (
                    <Card key={m.id} onPress={() => openRecord(m.uri)}>
                        <SplitContainer direction="column" padding={20} gap={5}>
                            <InterText whiteText={true}>ID: {m.id}</InterText>
                            <InterText isBold={true} whiteText={true}>{m.name}</InterText>
                        </SplitContainer>
                    </Card>
                )
            }) 
            }

            {
                medicalRecords.length < 1 && <InterText>No Records Yet</InterText>
            }
        
        </SplitContainer>
    )
}

export default MedicalRecordsDisplay;