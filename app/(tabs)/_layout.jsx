import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
     screenOptions={{ 
      tabBarActiveTintColor: '#B2FF59',
      tabBarStyle: { marginBottom: 0, paddingTop: 10, backgroundColor: '#f0f0f0' }, 
      headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="view-dashboard" color={color} />,
            tabBarInactiveTintColor: '#000000'
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#40C4FF',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="cards-heart" color={color} />,
            tabBarInactiveTintColor: '#000000'
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFAB40',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="weight-lifter" color={color} />,
          tabBarInactiveTintColor: '#000000'
        }}
      />
    </Tabs>
  );
}