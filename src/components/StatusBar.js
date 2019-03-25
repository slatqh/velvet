import React from 'react';
import { Platform, StatusBar, View } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 36 : StatusBar;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

const styles = {
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    opacity: 0.5,
  },
  // appBar: {
  //   backgroundColor: '#79B45D',
  //   height: APPBAR_HEIGHT,
  // },
}
;
