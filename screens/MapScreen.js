import React, { Component } from 'react';

import { connect } from 'react-redux';

import { MapView } from 'expo';

const { Marker } = MapView;


import eventService from '../services/eventService';

import publicEvents from '../mockData/publicEvents.json';

import { getEventsSuccess } from '../reducers/eventReducer';

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    eventService
      .getPublicEvents(0, 0, 1)
      .then(events => {
        console.log(events);
        this.props.getEventsSuccess(events);
      });
  }

  render() {
    console.log('publievents: ', this.props);
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          showsUserLocation: true
        }}
      >
        {
          this.props.publicEvents.map((event) => {
            console.log('events lat:', event.location);
            return (
              <Marker
                key={event.id}
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
  console.log(state);
  return {
    publicEvents: state.event.publicEvents,
    ...ownProps
  };
};

const mapDispatchToProps = {
  getEventsSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
