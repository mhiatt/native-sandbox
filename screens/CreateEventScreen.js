import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, TextInput, Switch } from 'react-native';

class CreateEventScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: null,
      eventDescription: null,
      private: false
    };
  }
  render() {
    return (
      <View>
        <TextInput
          onChangeText={text => this.setState({
            eventName: text
          })}
          value={this.state.eventName}
        />
        <TextInput
          onChangeText={text => this.setState({
            eventDescription: text
          })}
          value={this.state.eventDescription}
          multiline
          numberOfLines={10}
        />
        <Switch
          value={this.state.private}
          onValueChange={() => this.setState({
            private: !
            this.state.private
          })}
        />
      </View>
    );
  }
}

export default CreateEventScreen;
