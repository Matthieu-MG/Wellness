// TODO : Allow users to specify more details on target such as Quads or Hamstrings

const MuscleGroups = [
    {label: "Back", value: 1},
    {label: "Chest", value: 2},
    {label: "Biceps", value: 3},
    {label: "Triceps", value: 4},
    {label: "Legs", value: 5},
    {label: "Core", value: 6},
]

const ExerciseType = [
    {label: "Strength", value: 1},
    {label: "Conditioning", value: 2},
    {label: "Mobility", value: 3},
    {label: "Rehab", value: 4},
]

const mapMuscle = (value) => {
    try {
        const muscleValue = parseInt(value);
        const m = MuscleGroups.find((muscle) => muscle.value === muscleValue)
        return m.label;
    }
    catch (error) {
        console.log(error)
        return `ERROR GETTING MUSCLE TYPE ${value}`
    }
}

const mapExerciseType = (value) => {
    try {
        const exoValue = parseInt(value);
        const exo = ExerciseType.find((exo) => exo.value === exoValue)
        return exo.label;
    }
    catch (error) {
        console.log(error)
        return `ERROR GETTING LABEL ${value}`
    }
}

//* today should be an int being the weekday, routine is an array of workout objects
const getWorkoutOfTheDay = (today, routine) => {
    try {
        const day = (today + 6) % 7;
        return routine[day].workoutName;
      }
      catch (error) {
        console.log("ERROR from getWorkoutOfTheDay (index.jsx): ", error);
      }
}

export {MuscleGroups, ExerciseType, mapMuscle, mapExerciseType, getWorkoutOfTheDay};