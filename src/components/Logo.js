import React from 'react';
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';

export const Logo = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.container}>
    <Image
      style={styles.image}
      resizeMode='contain'
      source={require('../../assets/images/splash.png')}
    />


  </TouchableOpacity>

);

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
  },
  image: {
    height: null,
    width: null,
    alignSelf: 'stretch',
    padding: 20,
  },
};
