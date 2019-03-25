import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';
import {
  HomeScreen,
  ProfileScreen,
  ArticleScreen,
  AuthScreen,
  LoginScreen,
  SignUpScreen,
  WishList,
  Category,
} from '../screens';
import { SideMenu } from './SideMenu';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Article: ArticleScreen,
  WishList,
}, {
  initialRouteName: 'Home',
  headerMode: 'screen',
  transitionConfig: () => fadeIn(1200),
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});
const CategoryStack = createStackNavigator({
  Category,
}, {
  defaultNavigationOptions: {
    header: null,
  },
});

export const AuthStack = createStackNavigator({
  Auth: AuthScreen,
  Login: LoginScreen,
  Sign: SignUpScreen,
}, {
  defaultNavigationOptions: {
    header: null,
  },
  initialRouteName: 'Auth',
});

export const App = createDrawerNavigator({
  Menu: SideMenu,
  Home: HomeStack,
  Login: AuthStack,
  Profile: ProfileStack,
  Category: CategoryStack,
  WishList,
}, {
  headerMode: 'screen',
  transitionConfig: () => fadeIn(1200),
  initialRouteName: 'Home',
  contentComponent: ({ navigation }) => <SideMenu navigation={navigation} />,
  drawerWidth: () => Dimensions.get('window').width,
  drawerBackgroundColor: 'transparent',

});
