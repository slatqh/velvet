import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AuthStack, App } from './DrawerNavigator';

export default createAppContainer(createSwitchNavigator({
  Auth: AuthStack,
  App,
},
{
  initialRouteName: 'Auth',
}
));
