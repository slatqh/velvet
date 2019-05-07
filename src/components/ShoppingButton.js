import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

const GradientBtn = ({ name }) => (
  <LinearGradient
    colors={['#eceff1', '#e0e0e0', '#eceff1']}
    style={styles.gradient}
    start={{ x: 0, y: 1 }}
    end={{ x: 0.9, y: 0 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon
        type="font-awesome"
        color={Colors.black}
        size={15}
        iconStyle={{ alignSelf: 'flex-start', paddingLeft: 15, padding: 5 }}
        name="shopping-bag"
      />
      <Text style={styles.text}>{name} </Text>
    </View>
  </LinearGradient>
);

export const ShoppingButton = ({ onPress, styles }) => (
  <TouchableOpacity style={{ margin: 10 }} onPress={onPress}>
    <GradientBtn name="SHOPPING" />
  </TouchableOpacity>
);

const styles = {
  gradient: {
    borderRadius: 5,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    paddingLeft: 30,
    paddingVertical: 5,
    paddingRight: 50,
    fontFamily: 'PlayfairDisplay-Regular',
    fontWeight: '500',
    fontSize: 16,
  },
};
