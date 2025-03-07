import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Checkbox from '../Checkbox';
import SplitContainer from '../SplitContainer';

const data = [
  { label: 'Daily', value: '1' },
  { label: 'Weekly', value: '2' },
  { label: 'Monthly', value: '3' }
];

const DosingFrequencyForm = () => {
  const [value, setValue] = useState(null);

  return (
    <>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Daily"
        value={value}
        onChange={item => {
            setValue(item.value);
            }}
        />

        <SplitContainer direction='row' wrap={true} gap={0} padding={0}>
            {value === '2' && Array.from({length: 7}, (_, i) => {
                return <Checkbox key={i}
                                 value={i + 1}
                                 onPress={(checked, value) => console.log(`${value} is ${checked}`)}
                                 width={`${100/7}%`}
                                 />
            })}

            {value === '3' && Array.from({length: 28}, (_, i) => {
                return <Checkbox key={i}
                                value={i + 1}
                                onPress={(checked, value) => console.log(`${value} is ${checked}`)}
                                width={`${100/7}%`}
                                />
            })}
        </SplitContainer>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 100,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
});

/*
<SplitContainer direction='row' wrap={true} gap={0} padding={0}>
    {value === '2' && Array.from({length: 7}, (_, i) => {
        return <BouncyCheckbox key={i} 
        style={{width: `${100/7}%`, aspectRatio: 1, padding: 0, margin: 0}}
        disableText={true} onPress={(checked) => {console.log(checked)}}/>
    })}

    {value === '3' && Array.from({length: 28}, (_, i) => {
        return <BouncyCheckbox key={i} disableText={true} onPress={(checked) => {console.log(checked)}}/>
    })}
</SplitContainer>
*/

export default DosingFrequencyForm;