import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider,  SafeAreaView } from "react-native-safe-area-context";
import Card from '../../components/Card'
import SplitContainer from '../../components/SplitContainer'

export default function Health() {
  const c = '#03A9F4'
  const c1 = '#29B6F6'
  return (
    
    <SafeAreaProvider style={{height: "100%"}}>
    <SafeAreaView flex={1} style={{backgroundColor: "#F5F5F5", height: "100%"}}>
        <View style={styles.background}>
        <Image
            style={[styles.background, {height: "100%", width: "100%"}]}
            source={require('../../assets/images/blob-scene-haikei(1).png')} />
        </View>

      <View flex={1} style={{
        padding: 20,
        marginTop: "25",
        alignItems: 'center',
        gap: "25"
      }}>
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
  background: {
    flex: 1,
    flexWrap: 'wrap',
    ...StyleSheet.absoluteFill,
  },
});