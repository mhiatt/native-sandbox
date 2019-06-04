import React from 'react';

import authService from '../services/authService';

import {
  AsyncStorage,
  View,
  Button
} from 'react-native';


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    const result = await authService.googleSignIn();
    console.log(result);
    // this.props.navigation.navigate('App');
  };
}

export default SignInScreen;
