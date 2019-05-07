import React from 'react';
import {
  Animated,
  View,
  Text,
  Share,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { InstagramButton, ShareButton, ShoppingButton } from '../../components';
import { getDate } from '../../helpers';
import Colors from '../../../constants/Colors';
import { styles, ArticleTextStyles } from './styles';

const shareOptions = {
  title: 'Velvet',
  message:
    'Hey, get access to top fashion news on the VELVET app on the App Store or Google Play:',
  url: 'http://velvet-mag.com',
  subject: 'Share Link',
};
const { width, height } = Dimensions.get('window');
const HEADER = height / 1.5;
async function shareWithFriends() {
  await Share.share(shareOptions);
}

function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == 'img') {
    const { src } = node.attribs;
    const pWidth = node.attribs.width;
    const pHeight = node.attribs.height;
    const imageHeight = ((width - 20) * pHeight) / pWidth || 300;
    if (parent.name === 'p') {
      return (
        <Text>
          {'\n'}
          {'\n'}
          <Image
            key={index}
            style={{ width: width - 20, height: imageHeight }}
            source={{ uri: src }}
          />
          {'\n'}
          {'\n'}
        </Text>
      );
    }
    return (
      <Image
        key={index}
        style={{
          width: width - 20,
          height: imageHeight,
          margin: 0,
          padding: 0,
        }}
        source={{ uri: src }}
      />
    );
  }
  if (node.name === 'p') {
    if (node.children[0].data === '&nbsp;') {
      return null;
    }
    return (
      <Text key={index} style={ArticleTextStyles.articleText.p}>
        {defaultRenderer(node.children, node)}
      </Text>
    );
  }
  if (
    node.name === 'h1' ||
    node.name === 'h2' ||
    node.name === 'h3' ||
    node.name === 'h4' ||
    node.name === 'h5'
  ) {
    return (
      <Text key={index} style={ArticleTextStyles.articleText.h}>
        {defaultRenderer(node.children, node)}
      </Text>
    );
  }
}

export const ArticleText = ({ animation, data }) => {
  if (data.content === undefined) {
    return <View />;
  }
  const content = data.content.rendered.replace(
    /This slideshow requires JavaScript./g,
    ' ',
  );
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'black',
        },
      ]}>
      <Animated.View style={[styles.Bar, animation]} />
      <View style={{ padding: 20 }}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.authorName}>Admin</Text>
          {/* <Text style={Styles.readTime}>7 min read</Text> */}
        </View>
        <Text style={Styles.postCreated}>{getDate(data.date)}</Text>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ alignSelf: 'center' }}>
          <HTMLView value={content} renderNode={renderNode} />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ paddingBottom: 60 }}>
        <InstagramButton />
        <ShareButton onPress={() => shareWithFriends()} />
        {/* <ShoppingButton onPress={() => console.log('shopping button')} /> */}
      </View>
      {/* <SocialIcons styles={{ padding: 40 }} /> */}
    </View>
  );
};

const Styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  authorName: {
    color: Colors.white,
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
  },
  readTime: {
    color: Colors.white,
    opacity: 0.7,
    paddingRight: 30,
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
  },
  postCreated: {
    color: Colors.white,
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
  },
};
