import { Dimensions, Platform, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const { height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = height / 2;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: 'blue',
  },
  header: {
    // position: 'absolute',
    height: Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 250,
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
  },
  listScroll: {
    zIndex: 1,
    flex: 2,
    // position: 'absolute',
    // bottom: -HEADER_MAX_HEIGHT,
    left: 0,
    right: 0,
  },
  title: {
    fontFamily: 'Raleway-Medium',
    paddingLeft: 10,
    fontSize: 30,
    letterSpacing: 2,
    paddingVertical: 5,
  },
  date: {
    fontFamily: 'Raleway-Regular',
    color: Colors.Black,
    opacity: 0.6,
    fontSize: 10,
    padding: 5,
    marginLeft: 10,
  },
});
