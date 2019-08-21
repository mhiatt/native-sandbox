import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';

import { Permissions, Location } from 'expo';
import Constants from 'expo-constants';

import eventService from '../services/eventService';

import { getUserLocationSuccess, getUserSuccess } from '../reducers/userReducer';
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
  mounted = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.mounted = true;

    this._bootstrapAsync()
      .catch(() => this.props.navigation.navigate('Error'));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _bootstrapAsync = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }

    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted' && this.mounted) {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});

    this.props.getUserLocationSuccess(location);

    // use for testing loading screen render await wait(20000);

    // const currentUser = authService.getCurrentUser();
    // console.log('AuthLoadingScreen line: 23', currentUser);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.props.getUserSuccess(user.uid);

        const events = await eventService.getEvents(
          location.coords.latitude,
          location.coords.longitude,
          1
        );

        this.props.getPublicEventsSuccess(events.public);
        this.props.getPrivateEventsSuccess(events.private);

        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
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
  getUserLocationSuccess,
  getUserSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
