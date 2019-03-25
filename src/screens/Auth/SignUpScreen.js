import React, { Component } from 'react';
import { View,
  Text,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Inputs, CustomButton, Logo, Loading } from '../../components';
import {
  emailChanged,
  passwordChanged,
  nameChanged,
  passwordConfirmChanged,
  signUp,
  phoneChanged,
  login,
} from './actions';
import Colors from '../../../constants/Colors';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lading: false,
      message: 'Account created successfully',
    };
  }
  async _handleSignup() {
    const { name, email, password, passwordConfirm, phone } = this.props;
    if ((name.length === 0) || (email.length === 0)) {
      Alert.alert('Make sure all inputs is filled');
      return;
    } else if (password !== passwordConfirm) {
      Alert.alert('Password not match');
      return;
    }
    await this.props.signUp(name, email, password);
    await this.props.login(email, password, true).then(
      this.props.navigation.navigate('Category')
    );
  }

  _handleError() {
    return Alert.alert(this.props.error);
  }
  render() {
    console.log(this.props.password);
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={{ height: '100%' }}
          source={require('../../../assets/images/login.png')}
        >
          <View style={styles.logo}>
            <Logo />
          </View>
          { this.props.loading ? <Loading /> : null}
          { this.props.error ? this._handleError() : null}

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
          >
            <View style={styles.innerContainer}>
              <Inputs
                autoFocus
                placeholder='Full Name'
                icon='person'
                onChangeText={(e) => this.props.nameChanged(e)}
              />
              <Inputs
                placeholder='Email'
                icon='email'
                onChangeText={(e) => this.props.emailChanged(e)}
              />
              <Inputs
                placeholder='Phone number'
                icon='phone'
                onChangeText={(e) => this.props.phoneChanged(e)}
              />
              <Inputs
                placeholder='Password'
                secureTextEntry
                icon='lock'
                onChangeText={(e) => this.props.passwordChanged(e)}
              />
              <Inputs
                placeholder='Confirm password'
                secureTextEntry
                icon='lock'
                onChangeText={(e) => this.props.passwordConfirmChanged(e)}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.Button}>
            <Text style={styles.agreementText}> By clicking "Sign up" I agree to our {' '}
              <Text
                onPress={() => console.log('Terms')}
                style={{ color: Colors.black, textDecorationLine: 'underline' }}
              >
                  Terms of Service
              </Text>
            </Text>
            <CustomButton
              title='SIGNUP'
              color={Colors.black}
              backgroundColor={Colors.white}
              onPress={() => this._handleSignup()}
            />
          </View>
        </ImageBackground>
      </View>

    );
  }
}
const mapStateToProps = ({ Auth }) => {
  const {
    email, password, passwordConfirm,
    name, loading, error, phone, user, signup,
  } = Auth;
  return {
    email,
    password,
    passwordConfirm,
    name,
    loading,
    error,
    phone,
    user,
    signup,
  };
};
export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  nameChanged,
  passwordConfirmChanged,
  signUp,
  phoneChanged,
  login,
})(SignUpScreen);

const styles = {
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  Button: {
    margin: 20,
    marginBottom: 30,
  },
  agreementText: {
    flexDirection: 'row',
    fontSize: 12,
    alignItems: 'center',
    margin: 10,
    color: Colors.white,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 0.5,
  },
};
