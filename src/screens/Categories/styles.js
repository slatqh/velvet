import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width * 2;

export const styles = {
  circlesContainer: {
    marginHorizontal: 5,
    height: deviceWidth / 2,
    flexDirection: 'row',
  },
  smallCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7E354D',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediumCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#7E354D',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#7E354D',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dior: {
    marginLeft: 70,
    marginBottom: -6,
    alignItems: 'center',
  },
  drive: {
    marginLeft: 29,
    marginBottom: -3,
  },
  art: {
    marginTop: -38,
    marginRight: -70,
  },
  dinnig: {
    marginTop: -4,
    marginLeft: -2,
    marginButtom: -10,
  },
  week: {
    marginTop: -14,
    marginLeft: 38,
  },
  travel: {
    marginTop: 5,
    marginLeft: -16,
    marginBottom: -5,
  },
  culture: {
    marginLeft: -30,
    marginBottom: -8,
    marginRight: 3,
  },
  beauty: {
    marginLeft: -12,
    marginTop: 5,
  },
  women: {
    marginTop: 5,
    marginLeft: -20,
  },
  fashion: {
    marginTop: 18,
    marginLeft: -1,
    marginBottom: 4,
  },
  hotels: {
    marginTop: -16,
    marginLeft: -28,
  },
  hollidays: {
    marginLeft: -50,
  },
  shoots: {
    marginTop: 7,
    marginLeft: -36,
  },
  food: {
    marginLeft: -27,
  },
  men: {
    marginLeft: -50,
  },
  auto: {
    marginLeft: 14,
  },
  events: {
    flexWrap: 'wrap',
    marginTop: 25,
    marginLeft: 20,
    marginBottom: -70,
  },
  expo: {
    marginTop: 50,
    marginLeft: -40,
  },
  story: {
    marginTop: -7,
    marginLeft: -30,
  },
  bag: {
    marginTop: -14,
    marginLeft: -52,
  },
  influ: {
    marginTop: 103,
    marginLeft: -5,
  },
  watch: {
    marginTop: -11,
    marginLeft: -60,
  },
  enter: {
    marginTop: -4,
    marginLeft: -53,
  },
  bus: {
    marginLeft: -33,
    marginTop: 16,
  },
  groom: {
    marginTop: 0,
    marginLeft: -16,
  },
  bes: {
    marginTop: 90,
    marginLeft: -2,
    marginBottom: -18,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: 'PlayfairDisplay-Regular',
    paddingVertical: 5,
    fontWeight: '600',
  },
  title: {
    fontSize: 12,
    color: '#7E354D',
    fontFamily: 'PlayfairDisplay-Regular',
  },
};
