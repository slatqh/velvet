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
            <View
              style={{
                width: width / 2,
                backgroundColor: "#ddd",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#938585",
                  fontSize: 20,
                  paddingVertical: 5
                }}
              >
                Reload
              </Text>
            </View>
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
