import React, { Component } from 'react';

import { connect } from 'react-redux';

import { MapView, Permissions, Location } from 'expo';

const { Marker } = MapView;


import eventService from '../services/eventService';

import publicEvents from '../mockData/publicEvents.json';

import { getEventsSuccess } from '../reducers/eventReducer';
import { setUserLocation } from '../reducers/userReducer';

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.props.setUserLocation(location);
  }

  componentWillMount() {
    this.getUserLocation();
  }

  componentDidMount() {
    eventService
      .getPublicEvents(0, 0, 1)
      .then(events => {
        this.props.getEventsSuccess(events);
      });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.userLocation.coords && this.props.userLocation.coords.latitude, // TODO: have lodaing stat that does not mount this code until the users location is found
          longitude: this.props.userLocation.coords && this.props.userLocation.coords.longitude, //
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          showsUserLocation: true
        }}
      >
        {
          this.props.publicEvents.map((event, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: event.location._lat,
                  longitude: event.location._long
                }}
                title={event.name}
                description={this.description}
              />
            );
          })
        }
      </MapView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    publicEvents: state.event.publicEvents,
    userLocation: state.user.location,
    ...ownProps
  };
};

const mapDispatchToProps = {
  getEventsSuccess,
  setUserLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
