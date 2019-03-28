import React, { Component } from 'react';
import { View, AsyncStorage, Animated, Easing, Dimensions, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Pages } from 'react-native-pages';
import LottieView from 'lottie-react-native';
import { login } from './actions';
import { CustomButton } from '../../components';
import Colors from '../../../constants/Colors';

const { width, height } = Dimensions.get('window');
class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.progress = new Animated.Value(0);
    this.lottie = new Animated.Value(0);
  }
  componentWillMount() {
    this.reduceValue();
  }
  componentWillUnmount() {
    this.progress.removeListener();
  }
  reduceValue() {
    return this.progress.addListener(({ value }) => {
      if (value < 0) {
        return this.progress.setValue(0);
      } else if (value > 2) {
        return this.progress.setValue(2);
      }

      return Animated.timing(this.lottie, {
        toValue: value / 2,
        duration: 180,
        easing: Easing.linear,
      }).start();
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <LottieView
          style={[styles.lottie, {}]}
          source={require('../../../assets/lottie/data.json')}
          progress={this.lottie}
        />
        <Pages
          indicatorOpacity={0.5}
          indicatorColor={Colors.grey}
          containerStyle={{ marginTop: 0 }}
          indicatorPosition='bottom'
          progress={this.progress}
        >
          <Animated.View style={[styles.pages]} >
            <Animated.Text style={[styles.title]}>EXPLORE</Animated.Text>
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Text style={styles.descriptionExplore}>
              Learn about new trends and the latest events in the fashion industry
              from our writers around the world.
              </Text>
            </View>
          </Animated.View>
          <View style={[styles.pages, { }]}>
            <Text style={styles.title}>SHOP</Text>
            <View style={{ }}>
              <Text style={styles.descriptionShop}>
                Browse your favorite products by clicking the
                shopping links provided with the articles
              </Text>
            </View>
          </View>
          <View style={[styles.pages, { }]}>
            <Text style={styles.title}>BE INSPIRED</Text>
            <Text style={styles.descriptionInspired}>
              Discover new trends from our extensive coverage
              of fashion events around
              <Text style={{ flex: 1, margin: 50, alignItems: 'center' }}>the world.</Text>
            </Text>
          </View>
        </Pages>
        <View style={{ justifyContent: 'flex-end', paddingBottom: 30, marginLeft: 15, marginRight: 15 }}>

          <CustomButton
            title='LOGIN'
            color={Colors.grey}
            backgroundColor={Colors.black}

            onPress={() => this.props.navigation.navigate('Login')}
          />
          <CustomButton
            title='SIGNUP'
            color='black'
            backgroundColor={Colors.white}
            onPress={() => this.props.navigation.navigate('Sign')}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ Auth }) => {
  const { user } = Auth;
  return { user };
};
export default connect(mapStateToProps, { login })(AuthScreen);

const styles = {
  container: {
    flex: 1,
  },
  lottie: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    top: -height*0.07,
    width: width*1.3,
    height: height*1.3,
    marginBottom: 0,
    zIndex: -1,
  },
  title: {
    letterSpacing: 2,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Regular',
    justifyContent: 'flex-end',
    margin: 10,
  },
  descriptionExplore: {

    // justifyContent: 'center',
    // alignSelf: 'center',
    // paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    marginBottom: 10,
  },
  descriptionShop: {
    alignSelf: 'center',
    // paddingHorizontal: 25,
    fontSize: 12,
    fontFamily: 'raleway',
    marginBottom: 10,
  },
  descriptionInspired: {
    justifyContent: 'center',
    // alignSelf: 'center',
    // paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: 'raleway',
    marginBottom: 10,
  },
  pages: {
    justifyContent: 'flex-end',
    paddingHorizontal: 60,
    alignItems: 'center',
    // alignSelf: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
};
