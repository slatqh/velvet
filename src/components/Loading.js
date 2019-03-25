import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Loading = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <ActivityIndicator
      size="small"
      color="#212121"
    />
  </View>
);
