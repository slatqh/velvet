import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import Colors from '../../constants/Colors';

export const MenuText = ({ title, onPress, size, style }) => (
  <View style={style}>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.title, { fontSize: size }, style]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  title: {
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '500',
    color: Colors.white,
    alignSelf: 'center',
    margin: 15,
  },
};
