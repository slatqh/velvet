import { Dimensions } from 'react-native';
import Colors from '../../../../constants/Colors';

const { width, height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 550;
export const styles = {
  header: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    width: null,
    alignItems: 'center',
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  scrollContent: {
    zIndex: -1,
    // marginTop,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  textSection: {
    position: 'absolute',
    zIndex: 1,
    top: 110,
    left: 20,
    right: 10,
    justifyContent: 'flex-start',
  },
  shoppingBag: {
    position: 'absolute',
    top: 95,
    left: 70,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopBag: {
    backgroundColor: 'white',
    height: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starIcon: {
    position: 'absolute',
    opacity: 1,
    top: 180,
    right: 20,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    backgroundColor: Colors.black,
    opacity: 0.5,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  Bar: {
    paddingTop: 20,
    width: 80,
    alignSelf: 'center',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 3,
  },
  fashion: {
    fontSize: 12,
    paddingRight: 10,
    color: Colors.white,
    fontFamily: 'Raleway',
  },
  title: {
    fontFamily: 'Playfair Display',
    color: Colors.white,
    fontSize: 36,
  },
  gradient: {
    zIndex: -1, opacity: 0.7, position: 'absolute', top: 0, left: 0, width, height,
  },
  // styles for webcontent rendering
  articleText: {
    p: {
      flex: 1,
      // justifyContent: 'space-around',
      color: Colors.white,
      fontFamily: 'raleway',
      fontSize: 18,
      alignSelf: 'center',
      // padding: 14,
    },
    img: {
      flexDirection: 'row',
      width: '50%',
      alignSelf: 'center',
      paddingRight: 130,
    },
    div: {
      padding: 10,
      alignSelf: 'center',
    },
  },
};
