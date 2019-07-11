import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';

import { Permissions, Constants, Location } from 'expo';

import eventService from '../services/eventService';

import { getUserLocationSuccess } from '../reducers/userReducer';
import { getPublicEventsSuccess, getPrivateEventsSuccess } from '../reducers/eventReducer';

// for testing loading screen
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    try {
      this._bootstrapAsync();
    } catch(error) {
      console.log('AuthLoadingScreen _bootstrapAsync():', error);

      // TODO: Navigate to a fail screen
    }

  }

  _bootstrapAsync = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }

    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});

    this.props.getUserLocationSuccess(location);

    const events = await eventService.getEvents(
      location.coords.latitude,
      location.coords.longitude,
      1
    );

    this.props.getPublicEventsSuccess(events.public);
    this.props.getPrivateEventsSuccess(events.private);

    // use for testing loading screen render await wait(20000);

    // const currentUser = authService.getCurrentUser();
    // console.log('AuthLoadingScreen line: 23', currentUser);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = {
  getPublicEventsSuccess,
  getPrivateEventsSuccess,
  getUserLocationSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
