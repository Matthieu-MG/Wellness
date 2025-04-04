import AppContainer from '../../components/AppContainer'
import Card from '../../components/Card';
import InterText from '../../components/InterText';
import SplitContainer from '../../components/SplitContainer';
import ProgressCircle from '../../components/third_party/ProgressCircle';
import {useRouter} from 'expo-router'
import { DAILY, WEEKLY, getTodayHeader, getDayIndex, getDate } from '../../utils/Days';
import { useRoutineStore, useTreatmentsStore } from '../../utils/GlobalStateManager';
import { useEffect, useState } from 'react';
import { IsPedometerAllowedAsync, GetStepsToday } from '../../utils/DeviceSteps'

export default function Index() {
  const router = useRouter();
  const treatments = useTreatmentsStore((state) => state.treatments);
  const workout = useRoutineStore((state) => state.workout);
  const [steps, setSteps] = useState(0);
  const stepsGoal = 10000;

  const getAmountOfTreatmentsToday = () => {
    let counter = 0;

    const findDayAndIncrement = (t, day) => {
      const days = t.days.map(d => parseInt(d.day));

      const index = days.findIndex((d) => d === day)
      index !== -1 ? counter++ : null;
    }
    
    treatments.forEach(t => {
      try {

        const frequency = t.frequency;
        
        if(frequency === DAILY) counter++;
        
        else if(frequency === WEEKLY) {
          //* Day should be within 1 and 7 [Sun - Sat] as per Expo's usage and how days are stored
          const day = getDayIndex();
          findDayAndIncrement(t, day);
        }

        else {
          //* Ensures day is between 1 and 28
          const day = (getDate() % 29);
          findDayAndIncrement(t, day);
        }

      }
      catch(error) {
        console.error("ERROR from getAmountOfTreatmentsToday (index.jsx): ", error);
        return 0;
      }
    })
    
    return counter;
  }

  useEffect(() => {
    const setUserSteps = async () => {
      try {

        if(await IsPedometerAllowedAsync()) {
          setSteps(await GetStepsToday());
        }
        else {
          // Ensures steps stays at 0 is permission is denied
          setSteps(0);
        }
        console.log(Math.min(steps/stepsGoal, 1.0));
      }
      catch (error) {
        console.error("ERROR from setUserSteps (index.jsx): ", error);
      }
    }

    setUserSteps();
  }, []);

  return (
    <AppContainer>

        <SplitContainer direction='column' gap={10}>

          <SplitContainer direction='column'  flex={0} gap={0} padding={0}>
            <InterText>{getTodayHeader()}</InterText>
            <InterText isBold={true} isTitle={true}>Summary</InterText>
          </SplitContainer>

          <Card>
            <SplitContainer gap={0} padding={20}>

              <SplitContainer gap={5} flex={1} direction='column' alignItems='center'>
                <InterText whiteText={true} isBold={true}>Energy</InterText>
                <InterText whiteText={true} >0/100</InterText>
                <InterText whiteText={true} isBold={true}>Steps</InterText>
                <InterText whiteText={true} >{`${steps}/${stepsGoal}`}</InterText>
                <InterText whiteText={true} isBold={true}>Distance</InterText>
                <InterText whiteText={true} >0.1km</InterText>
              </SplitContainer>

              <SplitContainer gap={5} flex={1} direction='column' alignItems='center'>
                <ProgressCircle radius={60} strokeWidth={7} progress={Math.min(steps/stepsGoal, 1.0)} color={'#FFCC80'} maxValue={stepsGoal} value={steps}/>
              </SplitContainer>

            </SplitContainer>
          </Card>

        </SplitContainer>

        <SplitContainer direction='column' gap={10}>
          <InterText isBold={true} isTitle={true}>Treatments</InterText>
          <Card onPress={() => router.push('/treatments')}>
            <SplitContainer padding={30} direction='column' gap={15}>
              <InterText whiteText={true} isBold={true}>Today - {getAmountOfTreatmentsToday()}</InterText>
              <InterText whiteText={true} isBold={true}>Treatments Left - {treatments.length}</InterText>
            </SplitContainer>
          </Card>
        </SplitContainer>

        <SplitContainer direction='column' gap={10}>
          <InterText isBold={true} isTitle={true}>Workout</InterText>
          <Card>
            <SplitContainer padding={30} direction='column' gap={5}>
              <InterText whiteText={true} isBold={true}>Today's Workout: {workout}</InterText>
              <InterText whiteText={true}>
                {workout === "REST" ? "Have some well-deserved rest today!" : "Better put in some serious reps now!"}
              </InterText>
            </SplitContainer>
          </Card>
        </SplitContainer>

    </AppContainer>
  );
}