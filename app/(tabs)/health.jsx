import AppContainer from '../../components/AppContainer'
import Card from '../../components/Card';
import InterText from '../../components/InterText';
import SplitContainer from '../../components/SplitContainer';
import {useRouter} from 'expo-router';
import { getTodayHeader } from '../../utils/Days';
import { useTreatmentsStore } from '../../utils/GlobalStateManager';

export default function Health() {
  const router = useRouter();
  const treatments = useTreatmentsStore((state) => state.treatments);

  return (
    <AppContainer>

      <SplitContainer direction='column' gap={10}>

        <SplitContainer direction='column'  flex={0} gap={0} padding={0}>
          <InterText>{getTodayHeader()}</InterText>
          <InterText isBold={true} isTitle={true}>Health</InterText>
        </SplitContainer>

      </SplitContainer>

      <SplitContainer direction='column' gap={10}>
        <Card onPress={() => router.push('/treatments')}>
          <SplitContainer padding={30} direction='column' gap={5}>
            <InterText whiteText={true} isBold={true}>Treatments left: {treatments.length}</InterText>
            <InterText whiteText={true}>Review your current medical treatments!</InterText>
          </SplitContainer>
        </Card>
      </SplitContainer>

      <SplitContainer direction='column' gap={10}>
        <InterText isBold={true} isTitle={true}>Medical Records</InterText>
        <Card onPress={() => router.push('/medicalRecords')}>
          <SplitContainer padding={30} direction='column' gap={5}>
            <InterText whiteText={true} isBold={true}>Access and Search for your medical records</InterText>
            <InterText whiteText={true} isBold={false}>Don't forget to keep them up to date!</InterText>
          </SplitContainer>
        </Card>
      </SplitContainer>

      <SplitContainer direction='column' gap={10}>
        <InterText isBold={true} isTitle={true}>Logs</InterText>
        <Card onPress={() => {router.push('/todayCheckIn')}}>
          <SplitContainer padding={30} direction='column' gap={5}>
            <InterText whiteText={true} isBold={true}>Check-in your treatments for the day!</InterText>
            <InterText whiteText={true} >Treatments left to check: 0</InterText>
          </SplitContainer>
        </Card>
      </SplitContainer>

  </AppContainer>
  );
}