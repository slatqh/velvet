import React from 'react';
import { Animated, View, Text, Share } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { InstagramButton, ShareButton, ShoppingButton } from '../../components';
import { getDate } from '../../helpers';
import Colors from '../../../constants/Colors';
import { styles } from './styles';

const shareOptions = {
  title: 'Velvet',
  message: 'Hey, get access to top fashion news on the VELVET app on the App Store or Google Play:',
  url: 'http://velvet-mag.com',
  subject: 'Share Link',
};
async function shareWithFriends() {
  await Share.share(shareOptions);
}
export const ArticleText = ({ animation, data }) => {
  const content = data.content.rendered.replace('This slideshow requires JavaScript.', ' ');
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[styles.Bar, animation]}
      />
      <View style={{ padding: 20 }}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.authorName}>Souha Abbas</Text>
          {/* <Text style={Styles.readTime}>7 min read</Text> */}
        </View>
        <Text style={Styles.postCreated}>{getDate(data.date)}</Text>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ alignSelf: 'center' }}>

          <HTMLView
            value={content}
            stylesheet={styles.articleText}
          // renderNode={renderNode}
          />
        </View>

      </View>
      <View style={{ flex: 1 }} />
      <View style={{ paddingBottom: 60 }}>
        <InstagramButton />
        <ShareButton onPress={() => shareWithFriends()} />
        <ShoppingButton onPress={() => console.log('shopping button')} />
      </View>
      {/* <SocialIcons styles={{ padding: 40 }} /> */}
    </View>
  );
};

const Styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  authorName: {
    color:
    Colors.white,
    fontFamily: 'raleway',
    fontSize: 16,
  },
  readTime: {
    color: Colors.white,
    opacity: 0.7,
    paddingRight: 30,
    fontFamily: 'raleway',
    fontSize: 14,
  },
  postCreated: {
    color: Colors.white,
    fontFamily: 'raleway',
    fontSize: 14,
  },
}
;
