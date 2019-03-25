import React, { Component } from 'react';
import { View, SafeAreaView, Animated, Text, ScrollView, Dimensions, Easing, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Divider, Icon } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { userLogout } from '../../screens/Auth/actions';
import { MenuText, InstagramButton } from '../../components';
import { loadCategoryPosts, loadArticles } from '../../screens/Home/action';
import { styles } from './styles';
import { menuData } from '../../helpers';

const { height } = Dimensions.get('window');
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      menu: [],
      menuTitle: null,
    };
    this.animation = new Animated.Value(1);
    this.categoryMenu = new Animated.Value(0);
    this.titleOpactity = new Animated.Value(0);
    this.titleFashion = new Animated.Value(0);
    this.titleTravel = new Animated.Value(0);
    this.titleDrive = new Animated.Value(0);
    this.titleCulture = new Animated.Value(0);
    this.titleFood = new Animated.Value(0);
  }
  componentWillUnmount() {

  }
  _userLogout() {
    this.props.userLogout();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Auth');
  }
  async _homeButton() {
    await this.props.loadArticles();
    this.props.navigation.navigate('Home', { name: 'WHAT’S NEW' });
    this.props.navigation.closeDrawer();
    const { routeName } = this.props.navigation.state;
    const { navigation } = this.props;
    if (routeName === 'App') {
      navigation.closeDrawer();
    } else {
      return;
    }
  }
  loadPosts(id, categoryName, animationValue, heightValue) {
    this.setState({ menuTitle: categoryName.toLowerCase() });
    this.MenuAnimation(animationValue, heightValue);
  }
  loadCategory(id, categoryName) {
    this.props.loadCategoryPosts(id);
    this.props.navigation.navigate('Home', { name: categoryName.toUpperCase() });
    this.props.navigation.closeDrawer();
    this.setState({ showMenu: false });
  }

  MenuAnimation(value, heightValue) {
    Animated.parallel([
      Animated.timing(value, {
        toValue: height - height - heightValue,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }).start(() => value.setValue(0)),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(),
      Animated.timing(this.categoryMenu, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => this.setState({ showMenu: true })),
    ]);
    Animated.timing(this.titleOpactity, {
      toValue: 1,
      duration: 1100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }
  backToMainMenu() {
    Animated.parallel([
      Animated.timing(this.categoryMenu, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start(() => this.setState({ showMenu: false })),
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => this.titleOpactity.setValue(0)),

    ]);
  }
  render() {
    const popupMenu = menuData(this.state.menuTitle);
    const categoryMenuOpactity = {
      opacity: this.categoryMenu,
    };
    const titleOpacity = {
      opacity: this.titleOpactity,
    };
    const titleFashionStyle = {
      transform: [
        { translateY: this.titleFashion },
      ],
    };
    const titleTravelStyle = {
      transform: [
        { translateY: this.titleTravel },
      ],
    };
    const titleDriveStyle = {
      transform: [
        { translateY: this.titleDrive },
      ],
    };
    const titleCultureStyle = {
      transform: [
        { translateY: this.titleCulture },
      ],
    };
    const titleFoodStyle = {
      transform: [
        { translateY: this.titleFood },
      ],
    };
    return (

      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView>
          <Icon
            name='close'
            size={35}
            underlayColor="#514C4C"
            containerStyle={styles.closeButton}
            iconStyle={styles.icon}
            onPress={() => this.props.navigation.closeDrawer()}
          />
        </SafeAreaView>
        <View style={{ alignItems: 'center' }}>
          <MenuText title='HOME' onPress={() => this._homeButton()} />
          {/* Animated Menu */}
          <Animated.View style={[categoryMenuOpactity]}>
            { this.state.showMenu ? <Animated.View style={{ alignSelf: 'center' }}>
              <Animated.View style={[titleOpacity, { alignItems: 'center', marginBottom: 10 }]}>
                <Animated.View style={[{ flexDirection: 'row', alignItems: 'space-around', paddingRight: 20 }]}>
                  <Icon
                    type='font-awesome'
                    name='angle-left'
                    size={20}
                    color='white'
                    iconStyle={{ padding: 10 }}
                    containerStyle={{ paddingRight: 10 }}
                    onPress={() => this.backToMainMenu()}
                  />
                  <Text
                    style={styles.subMenuTitle}
                  >{this.state.menuTitle.toUpperCase()}
                  </Text>
                </Animated.View>
                <Divider style={{ marginTop: 7, backgroundColor: 'white', width: 120, height: 2 }} />
              </Animated.View>
              {
                popupMenu.map(i => (
                  <View style={[{ alignItems: 'center', marginBottom: 0, textDecorationLine: 'underline' }]} key={i.name}>
                    <MenuText title={i.name.toUpperCase()} onPress={() => this.loadCategory(i.id, i.name)} />
                  </View>
                ))
              }
            </Animated.View> : null
            }

          </Animated.View>
          {/* Main menu */}
          {
            !this.state.showMenu ? <Animated.View style={[{ alignSelf: 'center' }]}>
              <MenuText title='WOMEN' onPress={() => this.loadCategory(155, 'WOMEN')} />
              <MenuText title='MEN' onPress={() => this.loadCategory(156, 'MEN')} />
              <Animated.View style={[titleFashionStyle, { }]}>
                <MenuText
                  title='FASHION'
                  style={{ }}
                  onPress={() =>
                    this.loadPosts(170, 'fashion', this.titleFashion, 140)
                  }
                />
              </Animated.View>
              <Animated.View style={[titleTravelStyle]}>
                <MenuText
                  title='TRAVEL'
                  onPress={() => this.loadPosts(150, 'TRAVEL', this.titleTravel, 200)}
                />
              </Animated.View>
              <Animated.View style={[titleDriveStyle]}>
                <MenuText
                  title='DRIVE'
                  onPress={() => this.loadPosts(520, 'DRIVE', this.titleDrive, 250)}
                />
              </Animated.View>
              <Animated.View style={[titleCultureStyle]}>
                <MenuText
                  title='CULTURE'
                  onPress={() => this.loadPosts(163, 'CULTURE', this.titleCulture, 300)}
                />
              </Animated.View>
              <Animated.View style={[titleFoodStyle]}>
                <MenuText
                  title='FOOD'
                  onPress={() => this.loadPosts(151, 'FOOD', this.titleFood, 340)}
                />
              </Animated.View>
            </Animated.View> : null
          }
          {/* position: 'absolute', top: (height / 2) - 50 */}
          <View style={{ flex: 1 }}>
            <Divider style={[styles.divider]} />
            <MenuText title='PROFILE' onPress={() => this.props.navigation.navigate('Profile')} />
            <MenuText title='WISHLIST' onPress={() => this.props.navigation.navigate('WishList')} />
            <InstagramButton
              onPress={() => Linking.openURL('https://www.instagram.com/velvetmagazine/')}
            />
            <MenuText
              title='LOG OUT'
              onPress={() => this._userLogout()}
            />
          </View>
        </View>
      </ScrollView>

    );
  }
}
const mapStateToProps = ({ Auth }) => {
  const { user } = Auth;
  return { user };
};
export default connect(mapStateToProps, { userLogout, loadCategoryPosts, loadArticles })(SideMenu);
