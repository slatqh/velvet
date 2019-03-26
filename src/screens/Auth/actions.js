
import { AsyncStorage } from 'react-native';
import { User } from '../../../api/user';
import { Post } from '../../../api/post';
import {
  LOGIN,
  SIGNUP,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  NAME_CHANGED,
  EMAIL_CHANGED,
  PHONE_CHANGED,
  PASSWORD_CHANGED,
  PASSWORD_CONFIRM_CHANGED,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_SIGNUP_SUCCESS,
  STARRED_ARTICLES,
  STARRED_ARTICLE_UPDATE,
  STARRED_ARTICLES_DELETED,
  STARRED_FETCH_SUCCESS,
  STARRED_FETCH_FAILED,
} from './Authreducer';

export const nameChanged = (input) => ({
  type: NAME_CHANGED,
  payload: input,
});
export const emailChanged = (input) => ({
  type: EMAIL_CHANGED,
  payload: input,
});
export const phoneChanged = (input) => ({
  type: PHONE_CHANGED,
  payload: input,
});
export const passwordChanged = (input) => ({
  type: PASSWORD_CHANGED,
  payload: input,
});
export const passwordConfirmChanged = (input) => ({
  type: PASSWORD_CONFIRM_CHANGED,
  payload: input,
});

export function signUp(name, email, password) {
  return async (dispatch) => {
    dispatch({ type: SIGNUP });
    try {
      const data = await User.signUp({ name, email, password });
      return dispatch(SignUpSuccess(data));
    } catch (error) {
      return dispatch(loginFailed(error));
    }
  };
}

export function login(email, password) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });
    try {
      const data = await User.login({ email, password });
      return dispatch(loginSuccess(data));
    } catch (error) {
      return dispatch(loginFailed(error));
    }
  };
}

function SignUpSuccess() {
  return { type: USER_SIGNUP_SUCCESS };
}

export function loginSuccess(data) {
  const { name, email, _id, admin, starred, preferred } = data;
  return dispatch => {
    dispatch({ type: LOGIN_SUCCESS,
      name,
      email,
      user: _id,
      admin,
      starred,
      preferred,
    });
  };
}

export function loginFailed({ response }) {
  console.log(response);
  return {
    type: LOGIN_FAILED,
    payload: response.data.message,
  };
}

export function userLogout() {
  return async dispatch => {
    dispatch({ type: USER_LOGOUT });
    try {
      await AsyncStorage.clear();
      await User.signOut();
      return dispatch({ type: USER_LOGOUT_SUCCESS });
    } catch (error) {
      return dispatch({ type: USER_LOGOUT_FAILED, payload: error });
    }
  };
}

export function fetchingStarredArticles() {
  return async dispatch => {
    dispatch({ type: STARRED_ARTICLES });
    try {
      const { data } = await Post.getStarredArticles();
      return dispatch({ type: STARRED_FETCH_SUCCESS, payload: data });
    } catch (error) {
      return dispatch({ type: STARRED_FETCH_FAILED, payload: 'Server error' });
    }
  };
}
export function addStarredArticle(args) {
  return async (dispatch) => {
    dispatch({ type: STARRED_ARTICLES });
    try {
      const { starred } = await User.profileUpdate({ starred: args });

      return dispatch({
        type: STARRED_ARTICLE_UPDATE,
        payload: starred,
      });
    } catch (error) {
      throw error;
    }
  };
}
export function deleteStarred(args) {
  return async (dispatch) => {
    dispatch({ type: STARRED_ARTICLES });
    try {
      const { starred } = await User.profileUpdate({ starred: args });
      console.log('from action', starred);
      return dispatch({ type: STARRED_ARTICLES_DELETED, payload: starred });
    } catch (error) {
      throw error;
    }
  };
}

