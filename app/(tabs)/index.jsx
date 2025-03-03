import { View, ScrollView, StyleSheet, Image, ImageBackground } from "react-native";
import { SafeAreaProvider,  SafeAreaView } from "react-native-safe-area-context";
import {MaterialCommunityIcons, MaterialIcons, Ionicons} from '@expo/vector-icons'
import Card from '../../components/Card'
import SplitContainer from '../../components/SplitContainer'

//!  Min Height - 100% and removing flex from contentContainerStyle fixed it! for scroll view
export default function Index() {
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
          gap: "30"
        }}>
          <Card header="WellActive" body='Track your and set up reminders for your medical treatments.
          Set your workout weekly routine and monitor your nutrition via the apps planner and recorders' color="#ccff90"/>
          <SplitContainer>
            <Card header="Steps" body="5000">
              <Ionicons name="footsteps" size={24} color="orange" />
            </Card>
            <Card header="Schedule" body="Scheduled: x" flex={1.5} color="#CCFF90">
              <MaterialCommunityIcons name="reminder" size={24} color="orange" />
            </Card>
          </SplitContainer>
          <SplitContainer>
            <Card header="Meals" body="What did you eat today ?" color="#b9f6ca" flex={2}>
              <MaterialIcons name="restaurant-menu" size={24} color="orange" />
            </Card>
            <Card header="" body="" flex={1}>
              <MaterialCommunityIcons name="run" size={75} color="orange" />
            </Card>
          </SplitContainer>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexWrap: 'wrap',
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});