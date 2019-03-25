import Colors from '../../../constants/Colors';

const HEADER_MAX_HEIGHT = 450;
export const styles = {
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: 'blue',
  },
  header: {
    height: HEADER_MAX_HEIGHT,
    backgroundColor: 'white',
    top: 0,
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
    fontFamily: 'Raleway',
    color: Colors.Black,
    opacity: 0.6,
    fontSize: 10,
    padding: 5,
    marginLeft: 10,
  },

};
