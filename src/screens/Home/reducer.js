const initialState = {
  data: [],
  loading: false,
  error: '',
  articles: false,
  search: [],
  userSearch: false,
};

export const LOADING_ARTICLES = 'LOADING_ARTICLES';
export const ARTICLE_LOAD_SUCCESS = 'ARTICLE_LOAD_SUCCESS';
export const ARTICLE_LOAD_FAILED = 'ARTICLE_LOAD_FAILED';
export const CATEGORY_ARTICLES_SUCCESS = 'CATEGORY_ARTICLES_SUCCESS';
export const STARRED_ARTICLES = 'STARRED_ARTICLES';
export const STARRED_ARTICLE_UPDATE = 'STARRED_ARTICLE_UPDATE';
export const SEARCH_ARTICLES_STARTED = 'SEARCH_ARTICLES_STARTED';
export const SEARCH_ARTICLES_SUCCESS = 'SEARCH_ARTICLES_SUCCESS';
export const SEARCH_ARTICLES_FAILED = 'SEARCH_ARTICLES_FAILED';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ARTICLES:
      return { ...state, loading: true };
    case ARTICLE_LOAD_SUCCESS:
      return { ...state, loading: false, data: action.payload, articles: false };
    case ARTICLE_LOAD_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CATEGORY_ARTICLES_SUCCESS:
      return { ...state, loading: false, data: action.payload, articles: true };
    case SEARCH_ARTICLES_STARTED:
      return { ...state, loading: true, userSearch: true };
    case SEARCH_ARTICLES_SUCCESS:
      return { ...state, loading: false, search: action.payload };
    case SEARCH_ARTICLES_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};
