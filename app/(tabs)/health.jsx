import AppContainer from '../../components/AppContainer'
import Card from '../../components/Card'
import SplitContainer from '../../components/SplitContainer'

export default function Health() {
  const c = '#03A9F4'
  const c1 = '#29B6F6'
  return (
    <AppContainer>
      <SplitContainer>
        <Card header="Treatments" body="Active: 2" flex={6} color={c} isBlack={false}/>
        <Card header="Reminders" body="Scheduled: x" flex={4} color={c1} isBlack={false}/>
      </SplitContainer>
      <SplitContainer>
        <Card header="Records" body="" flex={1} color={c1} isBlack={false}/>
        <Card header="Profile" body="" flex={1} color={c} isBlack={false}/>
      </SplitContainer>
      <SplitContainer>
        <Card header="Appointments" body="This Month: 2" flex={2} color={c1} isBlack={false}/>
        <Card header="Contacts" body="" flex={1} color={c} isBlack={false}/>
      </SplitContainer>
      <Card color={c1} isBlack={false}/>
    </AppContainer>
  );
}