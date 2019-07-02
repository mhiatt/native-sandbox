import React from 'react';

import authService from '../services/authService';

import googleLogoSVG from '../assets/images/btn_google_signin_light_normal_web.png';

import {
  AsyncStorage,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  googleImage: {
    width: 220,
    resizeMode: 'contain'
  }
});


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={this._signInAsync}>
          <Image style={styles.googleImage} source={googleLogoSVG} />
        </TouchableOpacity>
        <Text>Don't worry! We never post to Facebook.</Text>
      </View>
    );
  }

  _signInAsync = async () => {
    const result = await authService.googleSignIn();

    console.log('SignInScreen line: 48', result);

    if (result.type === 'success') {
      this.props.navigation.navigate('App');
    }
  };
}

export default SignInScreen;
