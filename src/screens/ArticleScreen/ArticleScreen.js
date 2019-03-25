import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Animated,
  Platform,
  TouchableOpacity,
  Dimensions,
  Easing,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { MyStatusBar, Loading } from '../../components';
import { styles } from './styles';
import { addStarredArticle } from '../Auth/actions';
import { ArticleText } from './ArticleTextComponent';
import { Post } from '../../../api/post';
import Colors from '../../../constants/Colors';

const { width, height } = Dimensions.get('window');
const h1 = '<h1>';
const h1close = '</h1>';
const HEADER_MAX_HEIGHT = height - 300;

class ArticleScreen extends PureComponent {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      data: '',
      loading: true,
      zIndex: 1,
      starredId: [],
    };
    this.loadArticle();
    this.shoppingBagWidth = new Animated.Value(20);
    this.shoppingBag = new Animated.Value(0);
    this.shoppingBagOpacity = new Animated.Value(0);
    this.scrollY = new Animated.Value(
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
    );
  }

  componentDidMount() {
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
    const { data } = await Post.getArticle(articleId);
    this.setState({ data, loading: false, starredId: data.id });
  }

  _starredArticle() {
    const { starred } = this.props;
    const existingArticle = starred.includes(this.state.starredId);
    if (existingArticle) {
      return Alert.alert('Article already added to wishlist');
    }
    this.updateUserStarred();
  }

  async updateUserStarred() {
    const arr = [...this.props.starred, this.state.starredId];
    this.props.addStarredArticle(arr);
  }
  shoppingBagAnimation = () => {
    this.setState({ progress: !this.state.progress });
    Animated.parallel([
      Animated.timing(this.shoppingBagWidth, {
        toValue: this.state.progress ? 20 : 200,
        duration: 1000,
        easing: Easing.linear(),
      }).start(),
      Animated.timing(this.shoppingBag, {
        toValue: this.state.progress ? 0 : 170,
        duration: 1000,
      }).start(() => {
        Animated.timing(this.shoppingBagOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear(),
        }).start();
      }),
    ]);
  }
  render() {
    const { zIndex, data } = this.state;
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
      marginLeft: this.shoppingBag,
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
          <ArticleText animation={barOpacity} data={data} />
        </Animated.ScrollView>
        <View style={styles.header}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              // imageStyle,
            ]}
            source={{ uri: this.state.data.jetpack_featured_media_url }}
          />
          <LinearGradient
            colors={['black', 'transparent']}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.8, y: 0.8 }}
            style={styles.gradient}
          />
          <View style={styles.textSection}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.fashion}>FASHION</Text>
            </View>
            <View>
              <HTMLView
                value={`${h1}${data.title.rendered.toUpperCase()}${h1close}`}
                stylesheet={{
                  h1: {
                    fontFamily: 'Playfair Display',
                    color: Colors.white,
                    fontSize: 36,
                    marginRight: 20,
                    justifyContent: 'flex-end',
                    // flexDirection: 'row',

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
            containerStyle={{ backgroundColor: 'white', padding: 5, borderRadius: 25 }}
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
        <TouchableOpacity
          style={[styles.shoppingBag, { zIndex }]}
          onPress={() => null}
        >
          <Icon
            type='font-awesome'
            name='shopping-bag'
            size={10}
            containerStyle={{ backgroundColor: 'white', padding: 5, borderRadius: 25 }}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View
          style={[styles.shoppingBag, { zIndex }]}
        >
          <Animated.View style={[styles.shopBag, shoppingBagStyles]}>
            <Icon
              type='font-awesome'
              onPress={this.shoppingBagAnimation}
              name='shopping-bag'
              size={10}
              containerStyle={{ backgroundColor: 'white', padding: 5, borderRadius: 25 }}
              color={Colors.black}
              iconStyle={{ }}
            />
            {
              this.state.progress ? <View style={{ flex: 1 }}>
                <Animated.View style={[shoppingBagText, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                  <Animated.Text style={[shoppingBagText,
                    { fontSize: 12, letterSpacing: 1, fontFamily: 'Raleway', marginLeft: 10, alignSelf: 'center' }]}
                  >
                    {'shop long dress'.toUpperCase()}
                  </Animated.Text>
                  <Icon
                    type='font-awesome'
                    name='angle-right'
                    size={18}
                    containerStyle={{ flex: 1 }}
                    color={Colors.White}
                    iconStyle={{ }}
                  />
                </Animated.View>
              </View> : <View />
            }
          </Animated.View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ Auth }) => {
  const { starred } = Auth;
  return { starred };
};
export default connect(mapStateToProps, { addStarredArticle })(ArticleScreen);
