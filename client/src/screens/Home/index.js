
import React from 'react';
import Profile from './Profile'
import NewTrip from './NewTrip'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
const MyProfileStack = createStackNavigator();


const Home = () => {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="Profile" 
        component={Profile} 
        options={{
          title: "Parker"
        }}
      />
      <MyProfileStack.Screen
        name="NewTrip" 
        component={NewTrip} 
        options={{
          title: "Lol"
        }}
      />
    </MyProfileStack.Navigator>
  )
}

export default Home;
  