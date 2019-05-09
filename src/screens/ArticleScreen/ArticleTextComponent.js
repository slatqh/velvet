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
import HTML from 'react-native-render-html';
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
  console.log(parent);
  if (node.name == 'img') {
    const { src } = node.attribs;
    const pWidth = node.attribs.width;
    const pHeight = node.attribs.height;
    const imageHeight = ((width - 20) * pHeight) / pWidth || 400;
    if (parent.name === 'figure') {
      return (
        // <Text>
        //   {'\n'}
        //   {'\n'}
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Image
            key={index}
            style={{
              width: width - 20,
              height: imageHeight,
              marginTop: -50,
              paddingVertical: 0,
            }}
            source={{ uri: src }}
            resizeMode="cover"
          />
        </View>
        //   {/* {'\n'}
        //   {'\n'}
        // </Text> */}
      );
    }
    return (
      <Image
        key={index}
        style={{
          width: width - 20,
          height: imageHeight,
          marginTop: -40,
          padding: 0,
        }}
        source={{ uri: src }}
        resizeMode="cover"
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
function renderContent(content) {
  return <Text>{content}</Text>;
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
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <View>
          <HTML
            html={content}
            renderers={{
              img: htmlAttribs => {
                const imageHeight =
                  ((width - 20) * htmlAttribs.height) / htmlAttribs.width;
                const imageWidth = ((width - 20) * htmlAttribs.width) / height;

                return (
                  <View
                    key={htmlAttribs['data-attachment-id']}
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 25,
                    }}>
                    <Image
                      source={{ uri: htmlAttribs.src }}
                      // resizeMethod="resize"
                      resizeMode="contain"
                      // scale="fitStart"
                      style={{
                        flex: 1,
                        marginTop: 20,
                        width,
                        height: imageHeight,
                      }}
                    />
                  </View>
                );
              },
            }}
            baseFontStyle={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'Raleway-Regular',
            }}
          />
          {/* <HTMLView
            value={content}
            renderNode={renderNode}
            imagesInitialDimensions={{ width: 300, height: 300 }}
            classesStyles={{ 'gallery-icon landscape': { marginTop: -50 } }}
          /> */}
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ padding: 60 }}>
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
