import React from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'react-final-form';

const FinalFormTextInput = ({ name, labelText, multiline, numberOfLines }) => {
  const styles = StyleSheet.create({
    label: {
      fontSize: 12
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#000000',
      margin: 15,
      textAlignVertical: multiline ? 'top' : 'center', // This is Android specific
      paddingRight: 5,
      paddingLeft: 5
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
          <TextInput
            style={styles.textInput}
            multiline={multiline}
            numberOfLines={numberOfLines}
            {...input}
          />
          {
            meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>
          }
        </View>
      )}
    />
  );
};


export default FinalFormTextInput;

