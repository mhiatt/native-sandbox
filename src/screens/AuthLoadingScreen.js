import React from 'react';

import firebase from 'firebase';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place another test
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // const currentUser = authService.getCurrentUser();
    // console.log('AuthLoadingScreen line: 23', currentUser);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
