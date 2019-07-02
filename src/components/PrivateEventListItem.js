import React from 'react';

import { View, Text, Button } from 'react-native';

const PrivateEventListItem = ({ id, name, description, location, onPressRequestPermission }) => (
  <View>
    <Text>{ name }</Text>
    <Text>{ description }</Text>
    <Button
      onPress={() => onPressRequestPermission(id)}
      title="Request Permission"
    />
  </View>
);

export default PrivateEventListItem;
