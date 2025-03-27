import AppContainer from '../../components/AppContainer'
import Card from '../../components/Card';
import InterText from '../../components/InterText';
import SplitContainer from '../../components/SplitContainer';
import {useRouter} from 'expo-router';
import { getTodayHeader } from '../../utils/Days';
import { useRoutineStore } from '../../utils/GlobalStateManager';

export default function App() {
  const router = useRouter();
  const workout = useRoutineStore((state) => state.workout)

  return (
    <AppContainer>

      <SplitContainer direction='column' gap={10}>

        <SplitContainer direction='column'  flex={0} gap={0} padding={0}>
          <InterText>{getTodayHeader()}</InterText>
          <InterText isBold={true} isTitle={true}>Fitness</InterText>
        </SplitContainer>

      </SplitContainer>

      <SplitContainer direction='column' gap={10}>
        <Card color='orange' onPress={() => router.push('/workoutRoutine')}>
          <SplitContainer padding={30} direction='column' gap={5}>
            <InterText whiteText={true} isBold={true}>Today's Workout: {workout}</InterText>
            <InterText whiteText={true}>Consider switching up your workout routine!</InterText>
          </SplitContainer>
        </Card>
      </SplitContainer>

      <SplitContainer direction='column' gap={10}>
        <InterText isBold={true} isTitle={true}>Add Exercise</InterText>
        <Card color='orange' onPress={() => router.push('/exerciseDisplay')}>
          <SplitContainer padding={30} direction='column' gap={5}>
            <InterText whiteText={true} isBold={true}>Want to bring more variety to your workout ?</InterText>
            <InterText whiteText={true} isBold={false}>Fill the form and you're ready to do so!</InterText>
          </SplitContainer>
        </Card>
      </SplitContainer>

      <SplitContainer direction='column' gap={10}>
        <InterText isBold={true} isTitle={true}>Manage Workouts</InterText>
        <Card color='orange' onPress={() => {router.push('/workoutDisplay')}}>
          <SplitContainer padding={30} direction='column' gap={5}>
            <InterText whiteText={true} isBold={true}>Add, Edit and Delete Workouts</InterText>
            <InterText whiteText={true} >Amount of workouts: 0</InterText>
          </SplitContainer>
        </Card>
      </SplitContainer>

  </AppContainer>
  );
}
