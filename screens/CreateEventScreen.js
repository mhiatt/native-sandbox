import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, TextInput, Switch, StyleSheet, Button, Text } from 'react-native';

import eventService from '../services/eventService';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 30,
    margin: 15
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 15
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 15
  }
});

class CreateEventScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: null,
      eventDescription: null,
      private: false
    };
  }

  createEvent = () => {
    eventService.createEvent({
      name: this.state.eventName,
      description: this.state.eventDescription,
      location: {
        latitude: this.props.userLocation.coords.latitude,
        longitude: this.props.userLocation.coords.longitude
      }
    });
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.title}>Creat Event</Text>
        <TextInput
          onChangeText={text => this.setState({
            eventName: text
          })}
          value={this.state.eventName}
          style={styles.textInput}
          placeholder="Event Name"
        />
        <TextInput
          onChangeText={text => this.setState({
            eventDescription: text
          })}
          value={this.state.eventDescription}
          multiline
          numberOfLines={10}
          style={styles.textArea}
        />
        <Switch
          value={this.state.private}
          onValueChange={() => this.setState({
            private: !
            this.state.private
          })}
        />
        <View>
          <Button
            title="Add Event"
            onPress={() => this.createEvent()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLocation: state.user.location,
    ...ownProps
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventScreen);
