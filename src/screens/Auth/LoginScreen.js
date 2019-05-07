import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Loading,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, login } from './actions';
import { Inputs, CustomButton, Logo } from '../../components';
import Colors from '../../../constants/Colors';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
    };
  }

  async _handleLogin() {
    const { email, password } = this.props;
    if (this.state.remember) {
      AsyncStorage.multiSet([
        ['userEmail', email],
        ['userPassword', `${password}`],
      ]);
      await this.props.login(email, password);
      this.checkUser();
    } else {
      await this.props.login(email, password);
      this.checkUser();
    }
  }

  checkUser() {
    this.props.navigation.navigate(this.props.user ? 'Home' : 'Login');
  }

  _handleError() {
    Alert.alert(this.props.error, 'Make sure email and password is correct', [
      {
        text: 'OK',
        onPress: () => this.props.navigation.navigate('Login'),
      },
      { cancelable: false },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={{ flex: 1 }}
          source={require('../../../assets/images/login.png')}>
          <View style={styles.logo}>
            <Logo />
          </View>
          {this.props.loading ? <Loading /> : null}
          {this.props.error ? this._handleError() : <View />}
          <View style={styles.innerContainer}>
            <Inputs
              clearButtonMode="while-editing"
              placeholder="Email"
              icon="email"
              autoFocus
              onChangeText={e => this.props.emailChanged(e)}
            />
            <Inputs
              placeholder="Password"
              secureTextEntry
              icon="lock"
              onChangeText={e => this.props.passwordChanged(e)}
            />
            <View style={styles.inputs}>
              <CheckBox
                iconLeft
                checkedIcon="check-square"
                checkedColor={Colors.white}
                checked={this.state.remember}
                right
                title="Remember me"
                textStyle={styles.rememberMe}
                containerStyle={styles.checkBox}
                onPress={() =>
                  this.setState({ remember: !this.state.remember })
                }
              />
              {/* <TouchableOpacity
                title='forgot password?'
                style={{ flex: 1, alignItems: 'flex-end', marginRight: 30 }}
              >
                <Text style={styles.forgetPass}>Forgot password?</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.Button}>
            <CustomButton
              title="LOGIN"
              color={Colors.grey}
              backgroundColor={Colors.black}
              onPress={() => this._handleLogin()}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const MapStateToProps = ({ Auth }) => {
  const { email, password, error, user } = Auth;
  return { email, password, error, user };
};
export default connect(
  MapStateToProps,
  {
    emailChanged,
    passwordChanged,
    login,
  },
)(LoginScreen);

const styles = {
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    flex: 1,
    padding: 0,
    paddingTop: 5,
    margin: 0,
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  Button: {
    margin: 20,
    marginBottom: 30,
  },
  forgetPass: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
  },
  rememberMe: {
    color: Colors.grey,
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 0.5,
  },
};
