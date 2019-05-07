import Colors from '../../../constants/Colors';

export const styles = {
  container: {
    flex: 1,
  },
  inner: {
    alignItems: 'center',
    margin: 10,
  },
  settings: {
    marginLeft: 30,
    marginTop: 20,
    fontFamily: 'Raleway-Regular',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  profileButton: {
    borderWidth: 1,
    borderRadius: 30,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    padding: 10,
    alignSelf: 'center',
    fontSize: 16,
    letterSpacing: 2,
    fontFamily: 'Raleway-Regular',
  },
  siteLinks: {
    fontFamily: 'Raleway-Regular',
    letterSpacing: 2,
    fontSize: 14,
    textDecorationLine: 'underline',
    padding: 10,
    alignSelf: 'center',
  },
  social: {
    paddingTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: Colors.grey,
    height: 150,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerLinks: {
    letterSpacing: 0,
    color: Colors.black,
    padding: 5,
    textDecorationLine: 'underline',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: '20',
  },
};
