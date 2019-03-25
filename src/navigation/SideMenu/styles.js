import { Platform, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

const { width } = Dimensions.get('window');
export const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContiner: 'space-around',
  },
  closeButton: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: Platform.OS === 'android' ? 30 : 30,
  },
  icon: {
    color: 'white',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: width / 2,
    height: 2,
    marginTop: 30,
    marginBottom: 40,
  },
  subMenuTitle: {
    marginRight: 20,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    letterSpacing: 2,
    alignSelf: 'center',
    fontWeight: '500',
  },
};
