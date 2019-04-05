import { User } from '../../../api/user'

import {
    UPDATING_USER_CATEGORY_FINISHED,
    UPDATING_USER_CATEGORY_START,
} from '../Auth/Authreducer'

export function updateUserCategory(category){
   return  async (dispatch) => {
        dispatch({ UPDATING_USER_CATEGORY_START})
        try {
           await User.profileUpdate({ preferred: category });
           return dispatch({ UPDATING_USER_CATEGORY_FINISHED});
        } catch (error) {
            throw error; 
        }
    }
};
