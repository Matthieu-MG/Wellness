import AppContainer from '../../components/AppContainer'
import Card from '../../components/Card';
import InterText from '../../components/InterText';
import SplitContainer from '../../components/SplitContainer';
import ProgressCircle from '../../components/third_party/ProgressCircle';

export default function Index() {
  return (
    <AppContainer>
        <InterText>FRIDAY, NOV 23</InterText>
        <InterText isBold={true} isTitle={true}>Summary</InterText>
        <Card>
          <SplitContainer padding={30}>

            <SplitContainer gap={5} direction='column'>
              <InterText isBold={true}>Energy</InterText>
              <InterText >0/100</InterText>
              <InterText isBold={true}>Steps</InterText>
              <InterText >0/5000</InterText>
              <InterText isBold={true}>Distance</InterText>
              <InterText >0.1km</InterText>
            </SplitContainer>

            <ProgressCircle radius={80} strokeWidth={15} progress={0.8} color={'#FFAB40'}/>

          </SplitContainer>
        </Card>
        <SplitContainer direction='column' gap={10}>
          <InterText isBold={true} isTitle={true}>Treatments</InterText>
          <Card>
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