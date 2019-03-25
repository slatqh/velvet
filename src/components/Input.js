import React from 'react';
import { Input, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';

export const Inputs = ({ placeholder, icon, onChangeText, secureTextEntry, autoFocus }) => (
  <Input
    placeholder={placeholder}
    onChangeText={onChangeText}
    autoCapitalize='none'
    placeholderTextColor={Colors.placeholder}
    autoCorrect={false}
    secureTextEntry={secureTextEntry}
    underlineColorAndroid="transparent"
    keyboardAppearance='default'
    autoFocus={autoFocus}
    containerStyle={{ paddingLeft: 10, paddingRight: 10 }}
    leftIconContainerStyle={{ marginLeft: 0 }}
    rightIconContainerStyle={{ backgroundColor: 'white' }}
    inputContainerStyle={{ borderBottomColor: Colors.white, marginBottom: 5 }}
    inputStyle={{ color: Colors.grey, fontSize: 14, paddingLeft: 10 }}
    leftIcon={
      <Icon
        iconStyle={{ color: Colors.white }}
        name={icon}
        size={24}
      />
    }
  />
);
