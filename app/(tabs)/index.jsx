import { ScrollView } from "react-native";
import { SafeAreaProvider,  SafeAreaView } from "react-native-safe-area-context";
import Card from '../../components/Card'
import SplitContainer from '../../components/SplitContainer'

//!  Min Height - 100% and removing flex from contentContainerStyle fixed it! for scroll view
export default function Index() {
  return (
    <SafeAreaProvider style={{height: "100%"}}>
      <SafeAreaView flex={1} style={{backgroundColor: "#F5F5F5", height: "100%"}}>
        <ScrollView contentContainerStyle={{
          padding: 20,
          backgroundColor: "#F5F5F5",
          marginTop: "25",
          alignItems: 'center',
          gap: "25"
        }}>
          <SplitContainer>
            <Card header="Steps" body="5000"/>
            <Card header="Schedule" body="Scheduled: x" flex={1.5}/>
          </SplitContainer>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
