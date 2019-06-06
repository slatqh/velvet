import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Root from "./src/root";
import store from "./src/redux/store";
import { OfflineNotice } from "./src/components";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
