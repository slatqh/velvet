import React from 'react';
import { TouchableOpacity, View, Text, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

const GradientBtn = () => (
  <LinearGradient
    colors={['#FF9800', '#ff0084']}
    style={styles.gradient}
    start={{ x: 0, y: 1 }}
    end={{ x: 0.9, y: 0 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon
        type="font-awesome"
        color={Colors.white}
        size={25}
        iconStyle={{ alignSelf: 'flex-start', paddingLeft: 15, padding: 5 }}
        name="instagram"
      />
      <Text style={styles.text}>FOLLOW VELVET</Text>
    </View>
  </LinearGradient>
);

export const InstagramButton = () => (
  <TouchableOpacity
    onPress={() =>
      Linking.openURL('https://www.instagram.com/velvetmagazine/')
    }>
    <GradientBtn name="FOLLOW VELVET" />
  </TouchableOpacity>
);

const styles = {
  gradient: {
    borderRadius: 5,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Raleway-Regular',
  },
};
