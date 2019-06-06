import React, { PureComponent } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get("window");

class OfflineNotice extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={this.props.onPress}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                backgroundColor: "#b52524",
                padding: 10
              }}
            >
              Reload
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width
  },
  offlineText: {
    color: "#fff"
  }
});
export default OfflineNotice;
