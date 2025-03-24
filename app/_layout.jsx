import { Stack } from "expo-router";
import { InitDb } from '../utils/DatabaseAccess'
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { cancelScheduledNotifications, getAllScheduledNotifications } from "../utils/Notifications"

export default function RootLayout() {
  useEffect( () => {
    InitDb();
    getAllScheduledNotifications();
  }, [])

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={ { headerShown: false } } > 
        <Stack.Screen name="(tabs)" options={ {headerShown: false} }/>
      </Stack>
    </GestureHandlerRootView>
  );
}
