import React from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';

export const CustomButton = ({ onPress, title, color, backgroundColor }) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor }]}>
        <Text style={[styles.text, { color }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    alignItems: 'stretch',
    margin: 5,
    // borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontWeight: '800',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    letterSpacing: 2,
    paddingTop: 15,
    paddingBottom: 15,
  },
};
