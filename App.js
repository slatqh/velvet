import React, { Component } from 'react';
import { } from 'react-native';
import { Provider } from 'react-redux';
import Root from './src/root';
import store from './src/redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

