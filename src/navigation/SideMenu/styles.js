import { Platform, Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  closeButton: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: Platform.OS === 'android' ? 30 : 30,
  },
  icon: {
    color: 'white',
    backgroundColor: 'transparent',

  },
  divider: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: width / 2,
    height: 2,
    marginTop: 0,
    marginBottom: 40,
  },
  mainDivider: {
    marginTop: 7, backgroundColor: 'white', width: 120, height: 2,
  },
  popUpMenu: {
    alignItems: 'center', marginBottom: 0, textDecorationLine: 'underline',
  },
  subMenuTitle: {
    flex: 1,
    flexDirection: 'row',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    letterSpacing: 2,
    alignItems: 'center',
    fontWeight: '500',
  },
});
