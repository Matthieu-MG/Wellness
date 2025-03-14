const days = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' 
]

const frequency = [
    { label: 'Daily', value: '1' },
    { label: 'Weekly', value: '2' },
    { label: 'Monthly', value: '3' }
  ];

function findFrequency(frequencyInput) {
    return frequency.find((f) => f.value === frequencyInput);
}

export {days, frequency, findFrequency};