// AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/WaterScreen'; // Sua tela atual
import MealsScreen from './screens/MealsScreen'; // Nova tela que você vai criar

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Water" component={HomeScreen} />
        <Tab.Screen name="Meals" component={MealsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
