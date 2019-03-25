import React from 'react';
import { Input } from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

export const ProfileInput = ({ onFocus, editable, onChangeText, disabled, label, placeholder, rightIcon, defaultValue, onPress }) => (
    <Input
      inputStyle={{ height: 35, fontFamily: 'raleway', fontSize: 14, textAlign: 'right', alignContent: 'center' }}
      placeholderTextColor={Colors.black}
      containerStyle={{ marginTop: 5 }}
      autoCorrect={false}
      onFocus={onFocus}
      editable={editable}
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      rightIconContainerStyle={{ margin: 0, padding: 0, height: 35 }}
      leftIconContainerStyle={{ marginLeft: 0, marginBottom: 1, padding: 5, height: 35 }}
      leftIcon={
       <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        >
          <Text style={{ fontFamily: 'Raleway', fontSize: 14, letterSpacing: 1.5 }}>{label}</Text>
        </TouchableOpacity>
      }
      rightIcon={rightIcon}
    />
);
