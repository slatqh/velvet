const initialState = {
  user: false,
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
  error: false,
  profileUpdate: false,
  notification: [],
  preferred: [],
  starred: [],
  starredArticles: [],
  admin: false,
  loading: false,
  signup: false,
};
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const NAME_CHANGED = 'NAME_CHANGED';
export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PHONE_CHANGED = 'PHONE_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const PASSWORD_CONFIRM_CHANGED = 'PASSWORD_CONFIRM_CHANGED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILED = 'PROFILE_UPDATE_FAILED';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const STARRED_ARTICLES = 'STARRED_ARTICLES';
export const STARRED_ARTICLE_UPDATE = 'STARRED_ARTICLE_UPDATE';
export const STARRED_ARTICLES_DELETED = 'STARRED_ARTICLES_DELETED';
export const STARRED_FETCH_SUCCESS = 'STARRED_FETCH_SUCCESS';
export const STARRED_FETCH_FAILED = 'FAILED';

export default (state = initialState, action) => {
  switch (action.type) {
    case NAME_CHANGED :
      return { ...state, name: action.payload };
    case EMAIL_CHANGED :
      return { ...state, email: action.payload, error: false };
    case PHONE_CHANGED :
      return { ...state, phone: action.payload, error: false };
    case PASSWORD_CHANGED :
      return { ...state, password: action.payload, error: false };
    case PASSWORD_CONFIRM_CHANGED :
      return { ...state, passwordConfirm: action.payload };
    case LOGIN_SUCCESS:
      return { ...state,
        name: action.name,
        email: action.email,
        user: action.user,
        admin: action.admin,
        starred: action.starred,
        loading: false,
        preferred: action.preferred,
      };
    case LOGIN:
      return { ...state, loading: true, signup: false };
    case SIGNUP:
      return { ...state, loading: true };
    case USER_SIGNUP_SUCCESS :
      return { ...state, signup: true, loading: false };
    case LOGIN_FAILED:
      return { ...state, error: action.payload, loading: false };
    case USER_LOGOUT :
      return { ...state, error: false };
    case USER_LOGOUT_SUCCESS:
      return { ...state, user: false, error: false };
    case PROFILE_UPDATE:
      return { ...state };
    case PROFILE_UPDATE_SUCCESS:
      return { ...state, name: action.name, email: action.email };
    case PROFILE_UPDATE_FAILED:
      return { ...state, error: action.payload };
    case STARRED_ARTICLES :
      return { ...state, loading: true, profileUpdate: false };
    case STARRED_ARTICLE_UPDATE:
      return { ...state, starred: action.payload, loading: false };
    case STARRED_ARTICLES_DELETED :
      return { ...state, loading: false, starred: action.payload };
    case STARRED_FETCH_SUCCESS :
      return { ...state, loading: false, starredArticles: action.payload };
    default:
      return state;
  }
};
