import { Button } from "react-native";
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from "react";
import InterText from "../InterText";
import CustomButton from "../CustomButton";

function DosingScheduleForm({index, setValue, remove}) {
    const [date, setDate] = useState(new Date());
    console.log(`Date: ${JSON.stringify(date, null, 2)}`)

    const onChange = (event, inputDate) => {
        console.log(`${inputDate.getHours()}:${inputDate.getMinutes()}`)
        setValue(`times.${index}.hour`, inputDate.getHours());
        setValue(`times.${index}.minute`, inputDate.getMinutes());
        setDate(inputDate)
    }

    if (Platform.OS === "android") {
        const show = () => {
            DateTimePickerAndroid.open({
                value: date,
                display: 'spinner', 
                onChange: onChange,
                mode: 'time',
                is24Hour: true
            })
        }

        return (
            <>
                <InterText>Time</InterText>
                <Button title="Set Time" onPress={show}></Button>
                <Button title="Remove" onPress={() => remove(index)}/>
            </>
        )
    }

    return (
        <>
            <InterText>Time</InterText>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'time'}
                is24Hour={true}
                display={Platform.OS === 'android' ? "spinner" : "default"}
                textColor="black"
                onChange={onChange}
            />
            <CustomButton title="Remove" onPress={() => remove(index)} 
                backgroundColor="#EF5350"
                isWhite={true}
                textColorChange={false}
                borderColor="#EF5350"   
                pressedColor="#D32F2F" 
                pressedBorderColor="#D32F2F"
            />
        </>
    )
}

export default DosingScheduleForm;