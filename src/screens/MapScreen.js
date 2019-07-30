import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

const { Marker } = MapView;


import eventService from '../services/eventService';

import { getPublicEventsSuccess, getPrivateEventsSuccess } from '../reducers/eventReducer';
import { getUserLocationSuccess } from '../reducers/userReducer';

import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.props.getUserLocationSuccess(location);

    var useLocale = firebase.functions().httpsCallable('useLocale');

    useLocale({
      corx: 'x',
      cory: 'y'
    }).then(function(ret) {
      console.log(ret.corz);
    }).catch(function(err) {
      console.log(err);
    })
  }

  componentWillMount() {
    // this.getUserLocation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userLocation !== this.props.userLocation) {
      eventService
        .getEvents(
          this.props.userLocation.coords.latitude,
          this.props.userLocation.coords.longitude,
          1
        )
        .then(events => {
          this.props.getPublicEventsSuccess(events.public);
          this.props.getPrivateEventsSuccess(events.private);
        });
    }
  }

  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.props.user.location.coords && this.props.user.location.coords.latitude, // TODO: have lodaing stat that does not mount this code until the users location is found
            longitude: this.props.user.location.coords && this.props.user.location.coords.longitude, //
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            showsUserLocation: true
          }}
        >
          {
            this.props.publicEvents.map((event, index) => {
              console.log(event);
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: event.location._lat,
                    longitude: event.location._long
                  }}
                  title={event.name}
                  description={event.description}
                />
              );
            })
          }
          {
            this.props.privateEvents.map((event, index) => {
              console.log(event.attendees[this.props.user.uid]);
              if (event.attendees[this.props.user.uid] === 0) {
                console.log('I HAVE PERMISSION');
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: event.location._lat,
                      longitude: event.location._long
                    }}
                    title={event.name}
                    description={event.description}
                  />
                );
              }
            })
          }
        </MapView>
        <View>
          <Button
            title="Add Event"
            onPress={() => this.props.navigation.navigate('PrivateEvents')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    publicEvents: state.event.publicEvents,
    privateEvents: state.event.privateEvents,
    user: state.user,
    ...ownProps
  };
};

const mapDispatchToProps = {
  getPublicEventsSuccess,
  getPrivateEventsSuccess,
  getUserLocationSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
