import { TextInput } from "react-native";
import InterText from "./InterText";
import { StyleSheet } from "react-native";
import { useState } from "react";
import CustomButton from "./CustomButton";
import SplitContainer from "./SplitContainer";
import { workoutCardFactory } from "./Workout";
import { GetWorkoutsByName } from '../utils/DatabaseAccess'
import { useRouter } from "expo-router";
import { Dropdown } from 'react-native-element-dropdown';

function SearchWorkout({Bind = () => {}, data = [{label: 'MONDAY', value: 0}]}) {
    const router = useRouter();
    const [day, setDay] = useState(0);
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);

    const onSearch = () => {
        const fetchResult = async () => {
            const workouts = await GetWorkoutsByName(search);
            console.log("Searched Workouts: ", workouts);
            
            if(!Array.isArray(workouts)) {
                workouts = []
            }

            setResults(workouts);
        }

        fetchResult();
    }

    const bindWorkout = (id, name) => {
        Bind(day, id, name);
    }

    return(
        <SplitContainer direction="column" gap={15} padding={10}>
            <TextInput style={styles.input} onChangeText={setSearch} placeholder="Name"></TextInput>
            <CustomButton title={'Search'} onPress={onSearch}/>

            <SplitContainer direction="column" gap={5}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Daily"
                    value={day}
                    onChange={item => {
                        setDay(item.value)
                    }}
                />
            </SplitContainer>

            <SplitContainer direction="column" gap={1}>
                {results.map( (workout, index) => {
                    return workoutCardFactory(true, bindWorkout, workout, index, router);
                })}
            </SplitContainer>
        </SplitContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: 'white',
        color: 'black',
        maxWidth: 200,
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 5,
        borderRadius: 8,
    },
    dropdown: {
        margin: 5,
        height: 50,
        width: 130,
        paddingLeft: 10,
        backgroundColor: '#efefef',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderRadius: 10
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
})

export default SearchWorkout;