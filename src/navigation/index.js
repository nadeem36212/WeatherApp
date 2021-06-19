import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Weather} from '../containers/Weather';
import {Map} from '../containers/Map';

const HomeStack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Weather">
        <HomeStack.Screen name="Weather" component={Weather} />
        <HomeStack.Screen name="Map" component={Map} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
