import { Stack } from "expo-router";
import { InitDb } from '../utils/DatabaseAccess'
import { useEffect } from "react";

export default function RootLayout() {
  useEffect( () => {
    InitDb();
  }, [])

  return (
  <Stack screenOptions={ { headerShown: false } } > 
    <Stack.Screen name="(tabs)" options={ {headerShown: false} }/>
  </Stack>
  );
}
