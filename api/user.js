import axios from 'axios';
import { keys } from '../constants/config';

class UserApi {
  async login(args) {
    try {
      const {data} = await axios.post(`${keys.LOCALHOST}/user/signin`, {
        ...args,
      });
      return data;
    } catch (error) {
      throw error.message;
    }
  }

  async signUp(args) {
    try {
      const { data } = await axios.post(`${keys.LOCALHOST}/user/signup`, { ...args });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    try {
      await axios.post(`${keys.LOCALHOST}/user/signout`);
    } catch (error) {
      throw error;
    }
  }
  async profileUpdate(args) {
    try {
      const { data } = await axios.post(`${keys.LOCALHOST}/user`, { ...args });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const User = new UserApi();
