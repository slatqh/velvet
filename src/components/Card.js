import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
// const Loading =  <ActivityIndicator color='#9e9e9e' size='small'/>

const h1 = '<h1>';
const h1close = '</h1>';
const { width, height } = Dimensions.get('window');

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
      return 0.3;
    }
    return 1;
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
            <View style={{ flex: 1 }}>
              <HTMLView
                value={`${h1}${this.props.title.toUpperCase()}${h1close}`}
                stylesheet={styles.title}
              />
              <Animated.View style={[this.props.showReadButton, { flex: 1 }]}>
                <TouchableOpacity
                  style={[styles.button, { marginTop: 10 }]}
                  onPress={onPress}
                >
                  <Text
                    style={{ width: 40, fontFamily: 'Raleway', letterSpacing: 1, fontSize: 12, color: Colors.white, flexDirection: 'row' }}
                  >READ</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginLeft: 10,
    width: width / 1.3,
    // height: (height / 2) + 40,
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
    flex: 0.5,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    h1: {
      flexDirection: 'row',
      // flex: 1,
      // marginRight: 40,
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      flexShrink: 1,
      fontFamily: 'Playfair Display',
      // flexShrink: 3,
      fontSize: 14,

    },
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
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
  },

};
