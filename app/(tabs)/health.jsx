import { ScrollView } from 'react-native'
import AppContainer from '../../components/AppContainer'
import SearchExercise from '../../components/SearchExercise';
import WorkoutDayForm from '../../components/forms/WorkoutDayForm';

export default function Health() {
  return (
    <AppContainer>
      <ScrollView 
        style={{width: "100%", height: "auto", flex: 1}}
        contentContainerStyle={{width: "100%", padding: 15, gap: 10}}
      >
        <WorkoutDayForm/>
      </ScrollView>
    </AppContainer>
  );
}