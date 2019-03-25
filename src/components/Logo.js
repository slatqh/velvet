import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';

export const Logo = () => (
  <View style={styles.container}>

    <Image
      style={styles.image}
      resizeMode='contain'
      source={require('../../assets/images/splash.png')}
    />

  </View>
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
