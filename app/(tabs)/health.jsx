import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider,  SafeAreaView } from "react-native-safe-area-context";
import Card from '../../components/Card'
import SplitContainer from '../../components/SplitContainer'

export default function Health() {
  const c = '#18FFFF'
  return (
    
    <SafeAreaProvider style={{height: "100%"}}>
    <SafeAreaView flex={1} style={{backgroundColor: "#F5F5F5", height: "100%"}}>
      <View flex={1} style={{
        padding: 20,
        backgroundColor: "#F5F5F5",
        marginTop: "25",
        alignItems: 'center',
        gap: "25"
      }}>
        <SplitContainer>
          <Card header="Treatments" body="Active: 2" flex={6} color={c}/>
          <Card header="Reminders" body="Scheduled: x" flex={4} color={c}/>
        </SplitContainer>
        <SplitContainer>
          <Card header="Records" body="" flex={1} color={c}/>
          <Card header="Profile" body="" flex={1} color={c}/>
        </SplitContainer>
        <SplitContainer>
          <Card header="Appointments" body="This Month: 2" flex={2} color={c}/>
          <Card header="Contacts" body="" flex={1} color={c}/>
        </SplitContainer>
        <Card color={c}/>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});