import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, FlatList, Text, Button } from 'react-native';

import PrivateEventListItem from '../components/PrivateEventListItem';

import eventService from '../services/eventService';

class PrivateEventsScreen extends Component {
  componentDidMount(prevProps) {
    if (prevProps.userLocation !== this.props.userLocation) {
      eventService
        .getEvents(
          this.props.userLocation.coords.latitude,
          this.props.userLocation.coords.longitude,
          1,
          true
        )
        .then(events => {
          this.props.getPrivateEventsSuccess(events);
        });
    }
  }

  requestPermission = (id) => {
    // TODO: add action to request permission
    // Then update status for event to pending
    // Listen on event for status update (firebase subscribe)
    // THen update status for event / maybe have gloabl toast notification / push notification if not in app
    console.log(id);
  }

  renderItem = ({ item }) => {
    <PrivateEventListItem
      id={item.id}
      name={item.name}
      description={item.description}
      location={item.location}
      onPressRequestPermission={this.requestPermission}
    />
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.privateEvents}
          render={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    privateEvents: state.event.privateEvents,
    userLocation: state.user.location,
    ...ownProps
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateEventsScreen);
