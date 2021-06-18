import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Weather} from '../containers/Weather';

const HomeStack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Weather">
        <HomeStack.Screen name="Weather" component={Weather} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
