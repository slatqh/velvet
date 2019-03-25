import { combineReducers } from 'redux';
import Authreducer from '../screens/Auth/Authreducer'
import Articlereducer from '../screens/Home/reducer';
;
export default combineReducers({
  Auth: Authreducer,
  Posts: Articlereducer,
});
