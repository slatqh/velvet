import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
// const Loading =  <ActivityIndicator color='#9e9e9e' size='small'/>

const h1 = '<h1>';
const h1close = '</h1>';
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height / 1.8;
const CARD_SMALL = height / 4;

export default class ImageCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      starIconStyle: false,
    };
  }
  opacityStyle() {
    const { starred, id } = this.props;
    const existingArticle = starred.includes(id);
    if (existingArticle) {
      return 1;
    }
    return 0.4;
  }
  render() {
    const { image, categoryName, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
      >

        <FastImage
          style={styles.image}
          source={{
            uri: image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        >
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', flex: 1, paddingTop: 20, paddingRight: 10 }}
            onPress={this.props.starIcon}
          >
            <Icon
              type='font-awesome'
              name='star'
              size={10}
              containerStyle={[styles.starIcon, { opacity: this.opacityStyle() }]}
              color={Colors.black}
            />
          </TouchableOpacity>
          <View style={styles.inner}>
            <View style={styles.category}>
              <Text style={{ fontSize: 12, letterSpacing: 2, fontFamily: 'raleway' }}>{categoryName()} </Text>
              {/* <Text style={{ opacity: 0.5 }}>7 min read </Text> */}
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <View stlye={{ flex: 0.7 }}>
                <HTMLView
                  value={`${h1}${this.props.title.toUpperCase()}${h1close}`}
                  stylesheet={title.title}
                />
              </View>
              <View style={[this.props.showReadButton, { }]}>
                <TouchableOpacity
                  style={[styles.button, { marginTop: 10 }]}
                  onPress={onPress}
                >
                  <Text
                    style={{ width: 40, fontFamily: 'Raleway', letterSpacing: 1, fontSize: 12, color: Colors.white, flexDirection: 'row' }}
                  >READ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  }
}
const title = {
  title: {
    h1: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      flexShrink: 1,
      fontFamily: 'Playfair Display',
      fontSize: 16,

    },
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    width: width / 1.3,
    // height: CARD_HEIGHT,
    paddingBottom: 10,
  },

  image: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    borderRadius: 16,
  },
  inner: {
    height: CARD_HEIGHT / 2,
    flex: 0.5,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  category: {
    alignSelf: 'flex-start',
  },

  button: {

    alignSelf: 'flex-end',
    width: 60,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.black,
    borderRadius: 35,
  },
  starIcon: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 20,
  },

});
