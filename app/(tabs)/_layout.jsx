import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const IconSize = 26;

  return (
    <Tabs
     screenOptions={{ 
      tabBarActiveTintColor: '#40C4FF',
      tabBarInactiveTintColor: '#ffffff',
      tabBarStyle: {
        position: `absolute`,
        bottom: "4%",
        left: "50%",
        marginBottom: 0,
        marginLeft: "10%",
        height: "8%",
        width: "80%",
        paddingBottom: 0,
        // alignSelf: 'center',
        backgroundColor: '#0f0f0f', borderRadius: 40,
      },
      tabBarIconStyle: {
        flex: 1,
      },
      tabBarButton: (props) => 
        <Pressable {...props} android_ripple={{ color: 'transparent' }} />,
      headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={IconSize} name="home-analytics" color={color} />,
            tabBarInactiveTintColor: '#ffffff'
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#40C4FF',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={IconSize} name="cards-heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFAB40',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={IconSize} name="weight-lifter" color={color} />,
        }}
      />
    </Tabs>
  );
}