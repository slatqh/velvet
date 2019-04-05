import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Animated,
  Platform,
  TouchableOpacity,
  Dimensions,
  Easing,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image';
import { MyStatusBar, Loading } from '../../components';
import { styles } from './styles';
import { loadArticlePost } from './action';
import { ArticleText } from './ArticleTextComponent';
import { addStarredArticle, deleteStarred } from '../Auth/actions';
import Colors from '../../../constants/Colors';

const { width } = Dimensions.get('window');
const h1 = '<h1>';
const h1close = '</h1>';
const HEADER_MAX_HEIGHT = Platform.OS === 'ios' ? 500 : 500;

class ArticleScreen extends PureComponent {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      progress: true,
      pressed: true,
      data: false,
      zIndex: 1,
      starredId: [],
      shopping: '',
      loading: true,
      articleColor: null,
    };
    this.shoppingBagWidth = new Animated.Value(24);
    this.shoppingBag = new Animated.Value(0);
    this.shoppingBagOpacity = new Animated.Value(0);
    this.scrollY = new Animated.Value(
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : -HEADER_MAX_HEIGHT
    );
  }
  componentDidMount() {
    this.loadArticle();
    this.scrollY.addListener(event => {
      if (event.value >= -200) {
        return this.setState({ zIndex: -1 });
      }
      return this.setState({ zIndex: 1 });
    });
  }

  componentWillUnmount() {
    this.scrollY.removeAllListeners();
  }
  async loadArticle() {
    const articleId = this.props.navigation.getParam('id');
    await this.props.loadArticlePost(articleId);
    const { data } = this.props;
    return this.setState({ data, shopping: data.mainShoppingLink, loading: false, starredId: data.id });
  }
  _starredArticle() {
    const { starred } = this.props;
    const existingArticle = starred.includes(this.state.starredId);
    if (existingArticle) {
      this.setState({ articleColor: true });
      const articleId = this.props.starred.filter(i => i !== this.state.starredId);
      return this.props.deleteStarred(articleId);
    }
    this.setState({ articleColor: false });
    return this.updateUserStarred();
  }

  async updateUserStarred() {
    const arr = [...this.props.starred, this.state.starredId];
    this.props.addStarredArticle(arr);
  }
  shoppingBagAnimation = () => {
    if (this.state.shopping === undefined) {
      return;
    }
    const { name } = this.state.shopping;
    const linkWidth = name.replace(/\s/g, '').length;
    const totalWidth = () => {
      if (linkWidth < 9) {
        return (linkWidth * 13) + 25;
      }
      return (linkWidth * 13) + 10;
    };

    this.setState({ progress: false });
    Animated.parallel([
      Animated.timing(this.shoppingBagWidth, {
        toValue: totalWidth(),
        duration: 800,
        easing: Easing.linear(),
      }).start(),
      Animated.timing(this.shoppingBagOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear(),
      }).start(() => this.setState({ pressed: true })),
    ]);
  }
  shoppingAnimationBack = () => {
    Animated.parallel([
      Animated.timing(this.shoppingBagOpacity, {
        toValue: 0,
        duration: 800,
        easing: Easing.linear(),
      }).start(),
      Animated.timing(this.shoppingBagWidth, {
        toValue: 24,
        duration: 800,
        easing: Easing.linear(),
      }).start(() => this.setState({ progress: true })),
    ]);
  }
  render() {
    const existingArticle = this.props.starred.includes(this.props.data.id);
    const { zIndex } = this.state;
    const starIconY = this.scrollY.interpolate({
      inputRange: [-HEADER_MAX_HEIGHT, -HEADER_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT],
      outputRange: [0, -130, -130],
      extrapolate: 'clamp',
    });
    const starIconX = this.scrollY.interpolate({
      inputRange: [-500, -250],
      outputRange: [0, -width + 90],
      extrapolate: 'clamp',
    });
    const barTranslate = this.scrollY.interpolate({
      inputRange: [-500, -250],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const barOpacity = {
      opacity: barTranslate,
    };
    const starIconStyle = {
      transform: [
        { translateY: starIconY },
        { translateX: starIconX },
      ],

    };
    const shoppingBagStyles = {
      width: this.shoppingBagWidth,
    };
    const shoppingBagText = {
      opacity: this.shoppingBagOpacity,
    };

    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <View >
        <MyStatusBar backgroundColor='black' barStyle="light-content" />
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          bounces={false}
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
          onScroll={
            Animated.event(
              [
                { nativeEvent:
                  {
                    contentOffset: { y: this.scrollY },
                  },
                },
              ],
              { useNativeDrive: true }
            )
          }
        >
          <View style={() => (Platform.OS === 'ios' ? null : { marginTop: -450 })}>
            <ArticleText animation={barOpacity} data={this.state.data} />
          </View>
        </Animated.ScrollView>
        <View style={styles.header}>
          <FastImage
            style={[
              styles.backgroundImage,
            ]}
            source={{ uri: this.state.data.jetpack_featured_media_url,
              priority: FastImage.priority.normal }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <LinearGradient
            colors={['black', 'transparent']}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.8, y: 0.8 }}
            style={styles.gradient}
          />
          <View style={[styles.textSection, { flex: 1 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.fashion}>FASHION</Text>
            </View>
            <View>
              <HTMLView
                value={`${h1}${this.props.articleTitle}${h1close}`}
                stylesheet={{
                  h1: {
                    fontFamily: 'Playfair Display',
                    color: Colors.white,
                    fontSize: 36,
                    marginRight: 25,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',

                  },
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.starIcon, starIconStyle, { zIndex }]}
          onPress={() => this._starredArticle()}
        >
          <Icon
            name='star'
            containerStyle={{ backgroundColor: existingArticle ? 'white' : '#4f4f4f', padding: 5, borderRadius: 25 }}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.closeButton]}
          onPress={() => this.props.navigation.goBack()}
        >
          <View>
            <Icon
              name='close'
              containerStyle={{ padding: 5, backgroundColor: '#4f4f4f', borderRadius: 40 }}
              color='white'
              size={30}
            />

          </View>
        </TouchableOpacity>
        {/* ANIMATION */}
        <Animated.View style={[styles.shoppingBag, { zIndex }]}>
          {

            this.state.progress ? <TouchableOpacity
              onPress={this.shoppingBagAnimation}
              style={{ backgroundColor: 'white', width: 24, borderRadius: 12, height: 24, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon
                type='font-awesome'
                name='shopping-bag'
                size={12}
                color={Colors.black}
              />

            </TouchableOpacity> :
              <Animated.View style={[shoppingBagStyles, { flex: 1,
                backgroundColor: 'white',
                height: 24,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center' }]}
              >
                <TouchableOpacity
                  onPress={this.shoppingAnimationBack}
                >
                  <Icon
                    type='font-awesome'
                    name='shopping-bag'
                    size={12}
                    iconStyle={{ paddingLeft: 5, paddingRight: 10 }}
                    color={Colors.black}
                  />

                </TouchableOpacity>
                <Animated.Text
                  style={[shoppingBagText]}
                  onPress={() => Linking.openURL(this.state.shopping.link)}

                >
                  {this.state.shopping.name.toUpperCase()}</Animated.Text>
                <Animated.View style={shoppingBagText}>
                  <Icon
                    onPress={() => Linking.openURL(this.state.shopping.link)}
                    type='font-awesome'
                    name='angle-right'
                    size={18}
                    iconStyle={[{ alignSelf: 'flex-end' }]}
                    color={Colors.black}
                  />

                </Animated.View>
              </Animated.View>
          }

        </Animated.View>
      </View>
    );
  }
}
const mapStateToProps = ({ Auth, Article }) => {
  const { starred, starredUpdate } = Auth;
  const { data, loading, articleTitle, articleContent } = Article;

  return { data, loading, articleTitle, articleContent, starred, starredUpdate };
};

export default connect(mapStateToProps, { loadArticlePost, addStarredArticle, deleteStarred })(ArticleScreen);

