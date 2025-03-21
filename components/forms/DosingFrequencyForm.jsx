import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Checkbox from '../Checkbox';
import SplitContainer from '../SplitContainer';
import InterText from '../InterText';

const data = [
  { label: 'Daily', value: '1' },
  { label: 'Weekly', value: '2' },
  { label: 'Monthly', value: '3' }
];

const days = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' 
]

function DosingFrequencyForm({fieldArray=[], setFieldValue, addDay, removeDay}) {
  const [value, setValue] = useState(1);

  const checkboxHandler = (checked, value) => {
      if(checked) {
        addDay({day: value})
      }
      else {
        const index = fieldArray.findIndex(day => day.day === value)
        index !== -1 ? removeDay(index) : console.log('ERROR (from DosingFrequencyForm): Could Not Find Index to Remove')
      }
  }

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
            setFieldValue('frequency', item.value); // Set to field property
            setValue(item.value);
            }}
        />

        <SplitContainer direction='row' wrap={true} gap={0} padding={0} alignItems='center'>
            {/* Days header */}
            {value != null && value != '1' && days.map((day, index) => {
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
            })}

            {/* Days checkboxes */}
            {value === '2' && Array.from({length: 7}, (_, i) => {
                return <Checkbox key={i}
                                 value={i + 1}
                                 onPress={(checked, value) => checkboxHandler(checked, value)}
                                 width={`${100/7}%`}
                        />
            })}

            {value === '3' && Array.from({length: 28}, (_, i) => {
                return <Checkbox key={i}
                                value={i + 1}
                                onPress={(checked, value) => checkboxHandler(checked, value)}
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

export default DosingFrequencyForm;