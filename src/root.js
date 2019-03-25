import React from 'react';
import AppContainer from './navigation/AppNavigator';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);

const Root = () => (
  <AppContainer />
);

export default Root;
