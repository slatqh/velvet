const initialState = {
  data: '',
  loading: false,
  error: '',
  articles: false,
  articleTitle: false,
  articleContent: '',
};

export const LOADING_ARTICLE_POST = ' LOADING_ARTICLE_POST';
export const ARTICLE_POST_LOAD_SUCCESS = 'ARTICLE_POST_LOAD_SUCCESS';
export const ARTICLE_POST_LOAD_FAILED = 'ARTICLE_POST_LOAD_FAILED';
export const STARRED_ARTICLES = 'STARRED_ARTICLES';
export const STARRED_ARTICLE_UPDATE = 'STARRED_ARTICLE_UPDATE';
export const STARRED_ARTICLES_DELETED = 'STARRED_ARTICLES_DELETED';
export const STARRED_FETCH_SUCCESS = 'STARRED_FETCH_SUCCESS';
export const STARRED_FETCH_FAILED = 'FAILED';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ARTICLE_POST :
      return { ...state };
    case ARTICLE_POST_LOAD_SUCCESS :
      return { ...state, data: action.payload, loading: false, articleTitle: action.title, articleContent: action.content };
    case ARTICLE_POST_LOAD_FAILED :
      return { ...state, error: action.payload, loading: false };
    case STARRED_ARTICLES :
      return { ...state, loading: true, profileUpdate: false };
    case STARRED_ARTICLE_UPDATE:
      return { ...state, starred: action.payload, loading: false, starredUpdate: !state.starredUpdate };
    case STARRED_ARTICLES_DELETED :
      return { ...state, loading: false, starred: action.payload };
    case STARRED_FETCH_SUCCESS :
      return { ...state, loading: false, starredArticles: action.payload };
    default:
      return state;
  }
};
