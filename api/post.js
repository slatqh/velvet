import axios from 'axios';
import { keys } from '../constants/config';

class PostApi {
  async allPost() {
    try {
      const { data } = await axios.post(`${keys.LOCALHOST}/posts/all`, {
        limit: 25,
        skip: 0,
      });
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
  async getArticle(id) {
    try {
      const data = axios.post(`${keys.LOCALHOST}/posts/single/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async categoryPosts(id) {
    try {
      const data = await axios.post(`${keys.LOCALHOST}/categories/posts`, {
        limit: 25,
        skip: 0,
        id,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async searchPosts(value) {
    try {
      const { data } = await axios.post(`${keys.LOCALHOST}/posts/search`, {
        query: value,
        skip: 0,
        limit: 15,
      });
      return data;
    } catch (error) {
      throw error.message;
    }
  }
  async getUser(value) {
    try {
      const { data } = await axios.get(`${keys.LOCALHOST}/user`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getStarredArticles() {
    try {
      const data = axios.get(`${keys.LOCALHOST}/posts/starred`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const Post = new PostApi();
