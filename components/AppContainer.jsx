import { View, Image, StyleSheet } from "react-native";
import { SafeAreaProvider,  SafeAreaView } from "react-native-safe-area-context";

function AppContainer({children}) {
    return (
        <SafeAreaProvider style={{height: "100%", width: "100%"}}>
            <SafeAreaView flex={1} style={{backgroundColor: "#F5F5F5", height: "100%", width:"100%"}}>
            <View style={styles.background}>
                <Image
                style={[styles.background, {height: "100%", width: "100%"}]}
                source={require('../assets/images/blob-scene-haikei(1).png')} />
            </View>
    
            <View flex={1} style={{
                padding: 20,
                marginTop: "5",
                alignItems: 'flex-start',
                gap: "1",
                width: "100%",
                height: "100%"
            }}>
                
                {children}
    
            </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
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

export default AppContainer;