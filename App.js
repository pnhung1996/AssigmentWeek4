import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllToDoTab from './screens/AllToDoTab';
import CompleteTab from './screens/CompleteTab';
import ActiveTab from './screens/ActiveTab';
import {AntDesign} from '@expo/vector-icons';

const MainBottomTab =createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>     
      <MainBottomTab.Navigator initialRouteName = 'AllToDoTab'>
        <MainBottomTab.Screen name = "CompleteTab" component = {CompleteTab}
        options = {{
          title : 'Complete',
          tabBarIcon : ({color, size}) => {
            return(
            <AntDesign name = "check" 
            size = {size} 
            color = {color}/>)}
        }}/>
        <MainBottomTab.Screen name = "AllToDoTab" component = {AllToDoTab}
        options = {{
          title : 'All',
          tabBarIcon : ({color, size}) => {
            return(
            <AntDesign name = "pluscircleo" 
            size = {size} 
            color = {color}/>)},
        }}/>
        <MainBottomTab.Screen name = "ActiveTab" component = {ActiveTab}
        options = {{
          title : 'Active',
          tabBarIcon : ({color, size}) => {
            return(
            <AntDesign name = "star" 
            size = {size} 
            color = {color}/>)}
        }}/>
      </MainBottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
