import React from 'react';
import { View, Text, TextInput } from 'react-native';

export const SearchBar = ({ value }) => (
  <View style={styles.container}>
    <TextInput
      style={{ backgroundColor: '#f5f5f5', padding: 5 }}
      autoCorrect={false}
      autoFocus
      placeholder='Search'
      onChangeText={(e) => value(e)}
    />
  </View>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
};
