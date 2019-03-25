import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export const SocialIcons = ({ onPress }) => (
  <View style={[styles.container]}>
    <Icon
      onPress={onPress}
      type='font-awesome'
      name='facebook'
      size={20}
      containerStyle={styles.iconContainer}
      color='#ffffff'
    />
    <Icon
      onPress={onPress}
      type='font-awesome'
      name='twitter'
      size={20}
      containerStyle={styles.iconContainer}
      color='#ffffff'
    />
    <Icon
      onPress={onPress}
      type='font-awesome'
      name='whatsapp'
      size={20}
      containerStyle={styles.iconContainer}
      color='#ffffff'
    />
    <Icon
      onPress={onPress}
      type='font-awesome'
      name='instagram'
      size={20}
      containerStyle={styles.iconContainer}
      color='#ffffff'
    />
    <Icon
      onPress={onPress}
      type='font-awesome'
      name='youtube'
      size={20}
      containerStyle={styles.iconContainer}
      color='#ffffff'
    />
    <Icon
      onPress={onPress}
      type='font-awesome'
      name='share'
      size={20}
      containerStyle={styles.iconContainer}
      color='#ffffff'
    />

  </View>
);

const styles = {
  container: {
    backgroundColor: '#f3f8f8',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#4f4f4f',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
