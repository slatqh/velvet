import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

export const SocialIcon = ({ name, onPress }) => (
  <TouchableOpacity
    style={{ paddingLeft: 20, paddingRight: 20 }}
    onPress={onPress}
  >
    <Icon
      type='font-awesome'
      name={name}
      size={20}
      underlayColor='transparent'
      containerStyle={styles.iconContainer}
      color='#ffffff'
    />
  </TouchableOpacity>
);

const styles = {
  iconContainer: {
    padding: 5,
    width: 30,
    height: 30,
    backgroundColor: '#4f4f4f',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
