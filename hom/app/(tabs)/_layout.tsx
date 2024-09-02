import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIcon2(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tabIconDefault,
        tabBarStyle: { 
          backgroundColor: '#101010',
          borderTopWidth: 0,  // Supprime la bordure par défaut
          elevation: 0,  // Supprime l'ombre sur Android
          shadowOpacity: 0,  // Supprime l'ombre sur iOS
        },
        headerShown: false, // Ceci cache l'en-tête pour tous les onglets
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon2 name="broadcast-on-home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Appareils',
          tabBarIcon: ({ color }) => <TabBarIcon name="lightbulb-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scenes"
        options={{
          title: 'Scènes',
          tabBarIcon: ({ color }) => <TabBarIcon name="random" color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          title: 'Programmes',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
