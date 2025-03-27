import AppContainer from "../components/AppContainer"
import InterText from "../components/InterText"
import SplitContainer from "../components/SplitContainer"
import Card from "../components/Card"
import { useLocalSearchParams } from "expo-router"
import { View, ScrollView } from "react-native"
import Checkbox from "../components/Checkbox"
import {days, findFrequency} from '../utils/Days'

// times : array of object {hour: "", minute: ""}
function parseTimeSchedule(times) {
    const convertToMinutes = (time) => {
        return (parseInt(time.hour) * 60) + parseInt(time.minute)
    }

    times.sort((a, b) => {
        return convertToMinutes(a) - convertToMinutes(b)
    })

    return times;
}

// time : int
function formatTime(time) {
    // Less than 2 digits
    if(time < 10)
    {
        return "0" + time;
    }
    return time;
}

// expects either value that corresponds to 'Weekly'/2 or 'Monthly'/3
function GetCheckBoxCount(frequency) {
    return parseInt(frequency) === 2 ? 7 : 28;
}

function RenderDaysHeaders(frequency) {
    return days.map((day, index) => {
        return (
        <View key={index} style={{
            width: `${100/7}%`,
            aspectRatio: 1,
            padding: 0,
            margin: 0,
            justifyContent: 'center'
        }}>
            <InterText>{day}</InterText>
        </View>
        )
    })
}

function RenderDays(treatment, treatmentDays) {
    let pointer = 0;
    let day = parseInt(treatmentDays[pointer].day);
    return(
        <>
        {
            Array.from({length: GetCheckBoxCount(treatment.frequency)}, (_, i) => {
                return <Checkbox
                        key={i}
                        value={i + 1}
                        onPress={() => {return}}
                        disabled={true}
                        width={`${100/7}%`}
                        defaultCheck={(() => {
                            if(day === i + 1)
                            {
                                pointer++;
                                pointer = pointer % treatmentDays.length;
                                day = parseInt(treatmentDays[pointer].day)
                                return true;
                            }
                            return false;
                        })
                        }
                    />
            })
        }
        </>
    )
}

function treatmentDetails() {
    const { data } = useLocalSearchParams();
    const treatment = data ? JSON.parse(data) : null

    if(treatment === null) {
        return (
            <AppContainer>
            </AppContainer>
        )
    }

    const times = parseTimeSchedule(treatment.times);
    const treatmentDays = treatment.days.length === 0 ? [] : treatment.days.sort((a,b) => parseInt(a.day) - parseInt(b.day));

    return(
        <AppContainer>
            <ScrollView style={{height: "100%", width: "100%"}}
            contentContainerStyle={{
                alignItems:'flex-start',
                gap: '15'
            }}>

            <InterText isTitle={true} isBold={true}>{treatment.treatmentName}</InterText>

            {/* Medications */}
            {treatment.medications.length > 0 &&
                <Card color="#FFB74D">
                    <SplitContainer direction="column" padding={15}>
                    <InterText whiteText={true} isBold={true}>Medications</InterText>
                    {treatment.medications.map( (med, index) => {
                        return(
                            <Card key={index} color="#EEEEEE">
                                <SplitContainer direction="column" gap={20} padding={20}>
                                    <InterText>Name: {med.name}</InterText>
                                    <InterText>Dosage: {med.dosage}</InterText>
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
                    </SplitContainer>

                </Card>
            }

            {/* Dosage Information (Frequency and Schedule) */}
            {treatment.times.length > 0 &&
                <Card color="#29B6F6">
                    <SplitContainer direction="column" padding={15}>
                        <InterText whiteText={true} isBold={true}>Dosage Information</InterText>
                        <Card color="#EEEEEE">
                            <SplitContainer direction="column" gap={20} padding={20}>
                                <InterText isBold={true}>Schedule</InterText>
                                {times.map( (time, index) => {
                                        return <InterText key={index}>¬{formatTime(time.hour)}:{formatTime(time.minute)}</InterText>
                                    }
                                )}
                            </SplitContainer>
                        </Card>

                        <Card color="#EEEEEE">
                            <SplitContainer direction="column" gap={20} padding={20}>
                                <InterText isBold={true}>Frequency</InterText>
                                <InterText>{findFrequency(treatment.frequency).label}</InterText>
                                {treatment.frequency !== 1 && treatment.days.length != 0 &&
                                    <SplitContainer direction="column" gap={0}>
                                        <SplitContainer gap={0}>
                                                { RenderDaysHeaders(treatment.frequency) }
                                        </SplitContainer>
                                        <SplitContainer wrap="wrap" gap={0}>
                                                { RenderDays(treatment, treatmentDays) }
                                        </SplitContainer>
                                    </SplitContainer>
                                }
                            </SplitContainer>
                        </Card>

                        {treatment.hasFinishDate &&
                        <Card color="#EEEEEE">
                            <SplitContainer direction="column" gap={20} padding={20}>
                                <InterText isBold={true}>Finish Date: {treatment.finishDate}</InterText>
                            </SplitContainer>
                        </Card>
                        }
                    </SplitContainer>
                </Card>
            }

        </ScrollView>
        </AppContainer>
    )
}

export default treatmentDetails;