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

export {days, frequency, findFrequency, DAILY, WEEKLY, MONTHLY};