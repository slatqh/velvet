import React from 'react';
import { View, Text, TextInput } from 'react-native';

export const Search = ({ value }) => (
  <View style={styles.container}>
    <TextInput
      style={{ backgroundColor: '#f5f5f5',
        padding: 5,
        paddingLeft: 10,
        overflow: 'visible',

        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10 }}
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
