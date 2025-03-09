import AppContainer from '../../components/AppContainer'
import Card from '../../components/Card';
import InterText from '../../components/InterText';
import SplitContainer from '../../components/SplitContainer';
import ProgressCircle from '../../components/third_party/ProgressCircle';
import {useRouter} from 'expo-router'

export default function Index() {
  const router = useRouter();

  return (
    <AppContainer>

        <SplitContainer direction='column' gap={10}>

          <SplitContainer direction='column'  flex={0} gap={0} padding={0}>
            <InterText>FRIDAY, NOV 23</InterText>
            <InterText isBold={true} isTitle={true}>Summary</InterText>
          </SplitContainer>

          <Card>
            <SplitContainer gap={0} padding={20}>

              <SplitContainer gap={5} flex={1} direction='column' alignItems='center'>
                <InterText isBold={true}>Energy</InterText>
                <InterText >0/100</InterText>
                <InterText isBold={true}>Steps</InterText>
                <InterText >0/5000</InterText>
                <InterText isBold={true}>Distance</InterText>
                <InterText >0.1km</InterText>
              </SplitContainer>

              <SplitContainer gap={5} flex={1} direction='column' alignItems='center'>
                <ProgressCircle radius={60} strokeWidth={9} progress={0.8} color={'#FFAB40'}/>
              </SplitContainer>

            </SplitContainer>
          </Card>

        </SplitContainer>

        <SplitContainer direction='column' gap={10}>
          <InterText isBold={true} isTitle={true}>Treatments</InterText>
          <Card onPress={() => router.push('/treatments')}>
            <SplitContainer padding={30} direction='column' gap={5}>
              <InterText isBold={true}>Amount Left Today</InterText>
                  <InterText>0</InterText>
                  <InterText isBold={true}>Days Left</InterText>
                  <InterText>31</InterText>
            </SplitContainer>
          </Card>
        </SplitContainer>

        <SplitContainer direction='column' gap={10}>
          <InterText isBold={true} isTitle={true}>Workout</InterText>
          <Card>
            <SplitContainer padding={30} direction='column' gap={5}>
              <InterText isBold={true}>Fitness</InterText>
                  <InterText >Streak: 0</InterText>
                  <InterText isBold={true}>Rest</InterText>
            </SplitContainer>
          </Card>
        </SplitContainer>

    </AppContainer>
  );
}

/*
  <Card>
    <SplitContainer gap={0}>

      <SplitContainer gap={5} direction='column' alignItems='center'>
        <InterText isBold={true}>Energy</InterText>
        <InterText >0/100</InterText>
        <InterText isBold={true}>Steps</InterText>
        <InterText >0/5000</InterText>
        <InterText isBold={true}>Distance</InterText>
        <InterText >0.1km</InterText>
      </SplitContainer>

      <SplitContainer gap={5} direction='column' alignItems='center'>
        <ProgressCircle radius={60} strokeWidth={9} progress={0.8} color={'#FFAB40'}/>
      </SplitContainer>

    </SplitContainer>
  </Card>
*/