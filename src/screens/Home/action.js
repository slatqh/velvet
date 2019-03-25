import {
  LOADING_ARTICLES,
  ARTICLE_LOAD_FAILED,
  ARTICLE_LOAD_SUCCESS,
  CATEGORY_ARTICLES_SUCCESS,
  SEARCH_ARTICLES_STARTED,
  SEARCH_ARTICLES_SUCCESS,
  SEARCH_ARTICLES_FAILED,
} from './reducer';
import { Post } from '../../../api/post';
import { User } from '../../../api/user';

export function searchValue(e) {
  console.log(e);
  return async (dispatch) => {
    dispatch({ type: SEARCH_ARTICLES_STARTED });
    try {
      const data = await Post.searchPosts(e);
      console.log(data);
      return dispatch(searchSuccess(data));
    } catch (error) {
      return dispatch(searchFailed(error));
    }
  };
}

function searchSuccess(data) {
  return {
    type: SEARCH_ARTICLES_SUCCESS,
    payload: data,
  };
}
function searchFailed(error) {
  return {
    type: SEARCH_ARTICLES_FAILED,
    payload: error,
  };
}
export function loadArticles() {
  return async (dispatch) => {
    dispatch({ type: LOADING_ARTICLES });
    try {
      const data = await Post.allPost();
      return dispatch(articlesLoadedSuccess(data));
    } catch (error) {
      return dispatch(articlesLoadFailed(error));
    }
  };
}
export function loadCategoryPosts(id) {
  return async (dispatch) => {
    dispatch({ type: LOADING_ARTICLES });
    try {
      const { data } = await Post.categoryPosts(id);
      return dispatch(categoryArticlesSuccess(data));
    } catch (error) {
      return dispatch(articlesLoadFailed(data));
    }
  };
}

function articlesLoadedSuccess(data) {
  return {
    type: ARTICLE_LOAD_SUCCESS,
    payload: data,
  };
}
function categoryArticlesSuccess(data) {
  return {
    type: CATEGORY_ARTICLES_SUCCESS,
    payload: data,
  };
}
function articlesLoadFailed(data) {
  return {
    type: ARTICLE_LOAD_FAILED,
    payload: data,
  };
}
