const days = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' 
]

const DAILY = '1';
const WEEKLY = '2';
const MONTHLY = '3';

const frequency = [
    { label: 'Daily', value: DAILY },
    { label: 'Weekly', value: WEEKLY },
    { label: 'Monthly', value: MONTHLY }
  ];

function findFrequency(frequencyInput) {
    return frequency.find((f) => f.value === frequencyInput);
}

const today = new Date();

const jsDays = [
    "SUNDAY", "MONDAY",
    "TUESDAY", "WEDNESDAY",
    "THURSDAY", "FRIDAY", "SATURDAY"
]

const jsMonths = [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP",
    "OCT", "NOV", "DEC"
]

const getDay = () => {
    try {
        return jsDays[today.getDay()];
    }
    catch (error) {
        console.error("ERROR from getDay (index.jsx) -> Index Out Of Range: ", error);
        return "NaN"
    }
}

const getDayIndex = () => {
    return today.getDay();
}
  
const getMonth = () => {
    try {
        return jsMonths[today.getMonth()];
    }
    catch (error) {
        console.error("ERROR from getDay (index.jsx) -> Index Out Of Range: ", error);
        return "NaN"
    }
}

const getTodayHeader = () => `${getDay()}, ${getMonth()} ${today.getDate()}`
const getRoutineDay = () => (today.getDay() + 6) % 7

export {days, frequency, findFrequency, DAILY, WEEKLY, MONTHLY,
        getDay, getDayIndex, getMonth, getTodayHeader, getRoutineDay };