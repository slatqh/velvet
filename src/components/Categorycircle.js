import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

export class Circle extends React.Component {
  state = {
    selected: false,
    category: [],
  };
  circleStyles = () => {
    const { name } = this.props;
    if (name.length <= 3) {
      return styles.smallCircle;
    }
    if (name.length <= 7) {
      return styles.mediumCircle;
    }
    return styles.largeCircle;
  };

  titleStyles = () => {
    const { name } = this.props;
    let twoWord = name.indexOf(' ') >= 0;
    if (twoWord) {
      return styles.twoWord;
    }
    return styles.oneWord;
  };
  alignCircle() {
    const { name } = this.props;
    if (name.length <= 3) {
      return { alignItems: 'center' };
    }
    if (name.length <= 7) {
      return { alignItems: 'center' };
    }
    return { alignItems: 'center' };
  }

  selectCategory() {
    this.setState(state => {
      return {
        selected: !this.state.selected,
      };
    });
    return this.props.onPress();
  }

  render() {
    const { selected } = this.state;
    return (
      <View>
        <View
          onPress={() => this.selectCategory()}
          style={
            selected
              ? [this.circleStyles(), { backgroundColor: 'black' }]
              : this.circleStyles()
          }>
          <Text
            style={
              selected
                ? [this.titleStyles(), { color: 'white' }]
                : this.titleStyles()
            }>
            {this.props.children.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  oneWord: {
    fontSize: 12,
    fontFamily: 'PlayfairDisplay-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  twoWord: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
  smallCircle: {
    margin: 0,
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediumCircle: {
    padding: -1,
    margin: -1,
    marginTop: -1,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  largeCircle: {
    marginBottom: -1,
    margin: 0,
    padding: -1,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    margin: 0,
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
