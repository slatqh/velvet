import React from 'react';
import AppContainer from './navigation/AppNavigator';
import { YellowBox } from 'react-native';

console.disableYellowBox = true;

const Root = () => (
  <AppContainer />
);

export default Root;
