import React from 'react';

import { View, Text, Switch, StyleSheet } from 'react-native';
import { Field } from 'react-final-form';

const FinalFormSwitch = ({ name, labelText }) => {
  const styles = StyleSheet.create({
    label: {
      fontSize: 12
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
        <View>
          <Text style={styles.label}>{labelText}</Text>
          <Switch
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
