import React, { Component } from 'react';

import { MapView } from 'expo';

const { Marker } = MapView;

import eventService from '../services/eventService';

import publicEvents from '../mockData/publicEvents.json';

class MapScreen extends Component {
  constructor(props) {
    super(props);

    eventService.getPublicEvents(0, 0, 1);
  }

  render() {
    console.log(Marker);
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          showsUserLocation: true
        }}
      >
        {
          publicEvents.map((event) => {
            return (
              <Marker
                key={event.id}
                coordinate={{
                  latitude: event.lat,
                  longitude: event.long
                }}
                title={event.eventName}
                description={event.eventDescription}
              />
            );
          })
        }

      </MapView>
    );
  }
}

export default MapScreen;
