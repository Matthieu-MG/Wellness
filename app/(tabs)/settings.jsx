import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import TreatmentForm from '../../components/forms/treatmentForm';
import ExerciseForm from '../../components/forms/ExerciseForm';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ExerciseForm/>
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
