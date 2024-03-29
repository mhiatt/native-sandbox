import React from 'react';
import { Provider } from 'react-redux';

import firebase from 'firebase';
import 'firebase/firestore';

import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Permissions, Location } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import store from './src/store';
// import mainReducer from './reducers/mainReducer';
// import initState from './initState.json';
import { getUserLocationSuccess } from './src/reducers/userReducer';
import AppNavigator from './src/navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    firebase.initializeApp({
      apiKey: "AIzaSyAsPmsXiZJcWSVIQjgnO0diwPpsMVNpcDM",
      authDomain: "hangout-a8056.firebaseapp.com",
      databaseURL: "https://hangout-a8056.firebaseio.com",
      projectId: "hangout-a8056",
      storageBucket: "hangout-a8056.appspot.com",
      messagingSenderId: "667748137982",
      appId: "1:667748137982:web:1105c062692d5d19"
    });

    this.state = {
      isLoadingComplete: false,
      errorMessage: null,
      location: null
    };
  }

  componentWillMount() {
    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //   });
    // } else {
    //   this._getLocationAsync();
    // }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _getLocationAsync = async () => {
    console.log('GETTING location');
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    store.dispatch(getUserLocationSuccess(location));
    this.setState({ location });
    console.log(location);
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }
}

export default App;
