import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../Auth/actions';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    const userPassword = await AsyncStorage.getItem('userPassword');
    if (userEmail && userPassword) {
      await this.props.login(userEmail, userPassword);
      return this.props.navigation.navigate('Home');
    }
    return this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(null, { login })(AuthLoadingScreen)
;
