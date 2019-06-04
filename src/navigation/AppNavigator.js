import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AuthStack, App } from './DrawerNavigator';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
