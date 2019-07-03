import React from 'react';

import { View, Text, Switch, StyleSheet } from 'react-native';
import { Field } from 'react-final-form';

const FinalFormSwitch = ({ name, labelText }) => {
  const styles = StyleSheet.create({
    container: {
      margin: 15
    },
    label: {
      fontSize: 12
    },
    switch: {
      alignSelf: 'flex-start'
    },
    error: {
      fontSize: 12,
      color: 'crimson'
    }
  });

  return (
    <Field
      name={name}
      render={({ input, meta }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{labelText}</Text>
          <Switch
            style={styles.switch}
            value={input.value}
            onValueChange={input.onChange}
          />
          {
            meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>
          }
        </View>
      )}
    />
  );
};

export default FinalFormSwitch;
