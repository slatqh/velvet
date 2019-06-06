import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { List, Card, Logo, Search, Loading } from '../../components';
import { Icon } from 'react-native-elements';
import { OfflineNotice } from '../../components';
import HomeScreen from './HomeScreen';

export default class HomeScreenMain extends Component {
  static navigationOptions = ({ navigation, loadArticles }) => {
    const search = navigation.getParam('search');
    console.log('SEARCH', search);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    return {
      headerTitle: () =>
        !search ? (
          <Search value={e => navigation.state.params.headerSearch(e)} />
        ) : (
          <Logo onPress={() => navigation.dispatch(resetAction)} />
        ),
      headerStyle: { borderBottomColor: 'transparent', opacity: 1 },
      headerLeft: (
        <Icon
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.openDrawer()}
          name="menu"
        />
      ),
      headerRight: !search ? (
        <Icon
          containerStyle={{ margin: 10 }}
          size={25}
          onPress={() => {
            navigation.setParams({ search: !search });
          }}
          name="close"
        />
      ) : (
        <Icon
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.setParams({ search: !search })}
          name="search"
        />
      ),
    };
  };
  state = {
    isConnected: true,
  };
  render() {
    if (this.state.isConnected) {
      return <HomeScreen navigation={this.props.navigation} />;
    }
    return <OfflineNotice />;
  }
}
