import { Stack } from "expo-router";
import { InitDb } from '../utils/DatabaseAccess'
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { cancelScheduledNotifications, getAllScheduledNotifications } from "../utils/Notifications"
import { useRoutineStore, useTreatmentsStore } from '../utils/GlobalStateManager'
import { DeserializeRoutine, DeserializeTreatment, IsMedicalRecordsDirectoryCreated, CreateMedicalRecordsDirectory } from "../utils/JSONSerializer"
import { getWorkoutOfTheDay } from '../utils/Exercises'
import { getDayIndex } from "@/utils/Days";

export default function RootLayout() {
  const loadTreatments = useTreatmentsStore((state) => (state.loadTreatments))
  const loadRoutine = useRoutineStore( (state) => (state.loadRoutine))
  const setWorkout = useRoutineStore( (state) => (state.setWorkout))

  useEffect( () => {
    const loadTreatmentsAsync = async () => {
      try {
        const treatments = await DeserializeTreatment();
        loadTreatments(treatments);
      }
      catch (error) {
        console.error("Error from _layout.jsx Initializing Treatments State: ", error);
      }
    }

    const loadRoutineAsync = async () => {
      try {
        const routine = await DeserializeRoutine();
        loadRoutine(routine);
        
        console.log(typeof getWorkoutOfTheDay);
        setWorkout(getWorkoutOfTheDay(getDayIndex(), routine));
      }
      catch (error) {
        console.error("Error from _layout.jsx Initializing Routine State: ", error)
      }
    }

    const makeMedicalRecordsDirectoryIfNotExists = async () => {
      const exists = await IsMedicalRecordsDirectoryCreated();
      if(!exists) {
        CreateMedicalRecordsDirectory();
      }
    }

    InitDb();
    // getAllScheduledNotifications();
    loadTreatmentsAsync();
    loadRoutineAsync();
    makeMedicalRecordsDirectoryIfNotExists();
  }, [])

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={ { headerShown: false } } > 
        <Stack.Screen name="(tabs)" options={ {headerShown: false} }/>
      </Stack>
    </GestureHandlerRootView>
  );
}
