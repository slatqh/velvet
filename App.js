import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Root from "./src/root";
import store from "./src/redux/store";
import { OfflineNotice } from "./src/components";

export default class App extends Component {
  // state = {
  //   isConnected: true
  // };
  // componentDidMount() {
  //   NetInfo.isConnected.addEventListener(
  //     "connectionChange",
  //     this.handleConnectionChange
  //   );

  //   NetInfo.isConnected.fetch().done(isConnected => {
  //     this.setState({ isConnected });
  //   });
  // }

  // componentWillUnmount() {
  //   NetInfo.isConnected.removeEventListener(
  //     "connectionChange",
  //     this.handleConnectionChange
  //   );
  // }

  // handleConnectionChange = isConnected => {
  //   this.setState({ isConnected });
  // };
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
    // return this.state.isConnected ? (
    //   <Provider store={store}>
    //     <Root />
    //   </Provider>
    // ) : (
    //   <TouchableOpacity onPress={() => this.componentDidMount()}>
    //     <OfflineNotice />
    //   </TouchableOpacity>
    // );
  }
}
