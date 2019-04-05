import { combineReducers } from 'redux';
import Authreducer from '../screens/Auth/Authreducer';
import Homereducer from '../screens/Home/reducer';
import ArticleReducer from '../screens/ArticleScreen/ArticleReducer';

export default combineReducers({
  Auth: Authreducer,
  Home: Homereducer,
  Article: ArticleReducer,
});
