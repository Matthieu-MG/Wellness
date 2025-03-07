import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import TreatmentForm from '../../components/forms/TreatmentForm';

export default function App() {
  const text = 'Hello, my container is blurring contents underneath!';
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TreatmentForm/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 3,
    flexShrink: 1,
    width: "100%",
    height: "auto",
    borderRadius: 35,
    gap: 15,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  background: {
    flex: 1,
    flexWrap: 'wrap',
    ...StyleSheet.absoluteFill,
  },
  box: {
    width: '25%',
    height: '20%',
  },
  boxEven: {
    backgroundColor: 'orangered',
  },
  boxOdd: {
    backgroundColor: 'gold',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
