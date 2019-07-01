import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, TextInput, Switch, StyleSheet, Button, Text } from 'react-native';
import { Form, Field } from 'react-final-form';

import FinalFormTextInput from '../components/FinalFormTextInput';
import FinalFormSwitch from '../components/FinalFormSwitch';

import eventService from '../services/eventService';
import insertPublicEvent from '../reducers/eventReducer';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 30,
    margin: 15
  },
  serverErrorText: {
    fontSize: 14,
    color: 'crimson'
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 15
  }
});

const validation = values => {
  const errors = {};

  if (!values.eventName) {
    errors.eventName = 'Required';
  }

  if (!values.eventDescription) {
    errors.eventDescription = 'Required';
  }

  return errors;
};


class CreateEventScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: null,
      eventDescription: null,
      private: false,
      serverError: false
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
    })
    .then(response => {
      this.props.insertPublicEvent(response);

      this.setState({
        serverError: false
      });
    })
    .catch(() => {
      this.setState({
        serverError: true
      });
    });
  }

  render() {
    return (
        <Form
          onSubmit={this.createEvent}
          validate={validation}
          render={({ handleSubmit, pristine, invalid }) => (
            <View
            style={styles.container}
            >
              <Text style={styles.title}>Creat Event</Text>
              {
                this.state.serverError && (
                  <View>
                    <Text style={styles.serverErrorText}>
                      Ah snap! Something went wrong when creating your event. Please try again later.
                    </Text>
                  </View>
                )
              }
              <FinalFormTextInput
                name="eventName"
                labelText="Event Name"
              />
              <FinalFormTextInput
                name="eventDescription"
                labelText="Event Description"
                multiline
                numberOfLines={10}
              />
              <FinalFormSwitch
                name="eventPrivate"
                labelText="Private Event"
              />
              <View>
                <Button
                  title="Add Event"
                  onPress={() => this.createEvent()}
                />
              </View>
            </View>
          )}
        />
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
  insertPublicEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventScreen);
