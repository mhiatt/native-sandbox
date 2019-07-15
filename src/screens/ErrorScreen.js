import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ErrorScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Ooops something went wrong!</Text>
      </View>
    );
  }
}

export default ErrorScreen;
