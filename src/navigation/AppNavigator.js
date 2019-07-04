import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import PrivateEventsScreen from '../screens/PrivateEventsScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';

import MainTabNavigator from './MainTabNavigator';

const AppStack = createStackNavigator({
  Map: {
    screen: MapScreen
  },
  CreateEvent: {
    screen: CreateEventScreen
  },
  PrivateEvents: {
    screen: PrivateEventsScreen
  }
}); // MainTabNavigator; // createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
