import React from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.125)'
  },
  titleText: {
    fontSize: 20,
    marginBottom: 15
  },
  description: {
    marginBottom: 15
  }
});

const PrivateEventListItem = ({ id, name, description, location, onPressRequestPermission }) => (
  <View style={styles.container}>
    <Text style={styles.titleText}>{ name }</Text>
    <Text style={styles.description}>{ description }</Text>
    <Button
      onPress={() => onPressRequestPermission(id)}
      title="Request Permission"
    />
  </View>
);

export default PrivateEventListItem;
