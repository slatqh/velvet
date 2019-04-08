import { User } from '../../../api/user'

import {
    UPDATING_USER_CATEGORY_FINISHED,
    UPDATING_USER_CATEGORY_START,
} from '../Auth/Authreducer'

export function updateUserCategory(category){
    console.log(category)
   return  async (dispatch) => {
        dispatch({ type: UPDATING_USER_CATEGORY_START})
        try {
           await User.profileUpdate(category);
           return dispatch({ type: UPDATING_USER_CATEGORY_FINISHED});
        } catch (error) {
            throw error;
        }
    }
};
