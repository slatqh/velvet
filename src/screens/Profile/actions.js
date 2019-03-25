import {
  PROFILE_UPDATE,
  PROFILE_UPDATE_FAILED,
  PROFILE_UPDATE_SUCCESS,
}
  from '../Auth/Authreducer';
import { User } from '../../../api/user';

export function updateProfile(name, email) {
  return async (dispatch) => {
    dispatch({ type: PROFILE_UPDATE });
    try {
      const data = await User.profileUpdate({ name, email });
      return dispatch(profileUpdateSuccess(data));
    } catch (error) {
      return dispatch(profileUpdateFailed(error));
    }
  };
}

export function profileUpdateSuccess(data) {
  const { name, email } = data;
  return {
    type: PROFILE_UPDATE_SUCCESS,
    name,
    email,
  };
}
export function profileUpdateFailed({ response }) {
  return {
    type: PROFILE_UPDATE_FAILED,
    payload: response.data.message,
  };
}
