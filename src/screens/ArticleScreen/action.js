
import { User } from '../../../api/user';
import { Post } from '../../../api/post';
import {
  STARRED_ARTICLES,
  STARRED_ARTICLE_UPDATE,
  STARRED_ARTICLES_DELETED,
  STARRED_FETCH_SUCCESS,
  STARRED_FETCH_FAILED,
  LOADING_ARTICLE_POST,
  ARTICLE_POST_LOAD_SUCCESS,
  ARTICLE_POST_LOAD_FAILED,
} from './ArticleReducer';

export function loadArticlePost(id) {
  return async dispatch => {
    dispatch({ type: LOADING_ARTICLE_POST });
    try {
      const { data } = await Post.getArticle(id);
      return dispatch(articlePostLoadSuccess(data));
    } catch (error) {
      return dispatch(articlePostLoadFailed(error));
    }
  };
}

function articlePostLoadSuccess(data) {
  const { title, content } = data;
  return {
    type: ARTICLE_POST_LOAD_SUCCESS,
    title: title.rendered,
    content,
    payload: data,
  };
}
function articlePostLoadFailed(data) {
  return {
    type: ARTICLE_POST_LOAD_FAILED,
    payload: data,
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
      return dispatch({ type: STARRED_ARTICLES_DELETED, payload: starred });
    } catch (error) {
      throw error;
    }
  };
}

