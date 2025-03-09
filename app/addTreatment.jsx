import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import TreatmentForm from '../components/forms/treatmentForm';

function addTreatment() {
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
  }
})

export default addTreatment;