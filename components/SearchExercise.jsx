import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, TextInput } from "react-native";
import { MuscleGroups ,ExerciseType, mapExerciseType, mapMuscle } from "../utils/Exercises";
import CustomButton from "./CustomButton";
import InterText from "./InterText";
import SplitContainer from "./SplitContainer";
import Card from "./Card";
import { GetExercises } from '../utils/DatabaseAccess'
import Checkbox from "./Checkbox";

function SearchExercise({onAdd = () => {}}) {
    const [name, setName] = useState("");
    const [type, setType] = useState(-1);
    const [muscleGroup, setMuscleGroup] = useState(-1);
    const [searchResults, setSearchResults] = useState([]);
    const selectedExercises = []

    const fetchResults = async (query) => {
        const results = await GetExercises(query);
        setSearchResults(results);
    }

    const onSearch = () => {
        let query = "";

        const addANDtoQuery = () => {
            if(query.length > 0) {
                query += " AND ";
            }
        }

        if(name !== "") {
            query += `name = '${name}'`;
        }
        if(type !== -1) {
            addANDtoQuery();
            query += `type = '${type}'`;
        }
        if(muscleGroup !== -1) {
            addANDtoQuery();
            query += `muscleGroup = '${muscleGroup}'`;
        }

        if(query.length > 0) {
            query = `WHERE ` + query;
        }

        //* Search based on query
        fetchResults(query);
    }

    const onAddToWorkout = () => {
        onAdd(selectedExercises)
    }

    const onResultChecked = (checked, value) => {
        if(checked) {
            // Add id to array
            selectedExercises.push(value);
            console.log(selectedExercises)
        }
        else {
            // find index and remove it from array
            const index = selectedExercises.findIndex((exo) => exo.id === value.id)
            if(index !== -1) {
                // selectedExercises.
            }
        }
    }

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder={"Name"}
                placeholderTextColor={'#a0a0a0'}
                onChangeText={(text) => setName(text)}
            />
        
            <InterText isBold={true}>Exercise Type</InterText>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={ExerciseType}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="ALL"
                value={type}
                onChange={item => {
                    setType(item.value);
                    }}
            />

            <InterText isBold={true}>Muscle Group</InterText>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={MuscleGroups}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="ALL"
                value={muscleGroup}
                onChange={item => {
                    setMuscleGroup(item.value);
                }}
            />

            <CustomButton title={"Search"} onPress={onSearch}/>

            <CustomButton title={"Add to Workout"} onPress={onAddToWorkout}/>

            <SplitContainer direction="column">
                <InterText>Results: {searchResults.length}</InterText>
            </SplitContainer>

            <SplitContainer direction="column" gap={0}>
                {searchResults.map((result) => {
                    return(
                    <Card key={result.name} color={'white'}>
                        <SplitContainer padding={10}>

                        <SplitContainer flex={1} direction="column" alignItems="flex-start" justifyContent="flex-start" gap={1}>
                            <InterText isBold={true}>{result.name}</InterText>
                            <InterText fontSize={10}>{result.isCompound == true ? "Compound" : mapMuscle(result.muscleGroup)}</InterText>
                            <InterText fontSize={10}>{mapExerciseType(result.type)}</InterText>
                        </SplitContainer>

                        <SplitContainer flex={1} direction="column" alignItems="center" gap={0}>
                            <InterText isBold={true}>Add</InterText>
                            <Checkbox
                                value={result}
                                width="50%"
                                disabled={false}
                                onPress={onResultChecked}
                            />
                        </SplitContainer>

                        </SplitContainer>
                    </Card>
                    )
                })}
            </SplitContainer>
        </>
    )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      width: 130,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 5,
    }
});

export default SearchExercise;