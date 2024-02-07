import api from '../../data/api';
import { setAuthUserActionCreator } from '../authUser/action';

export const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD'
};

export function setIsPreloadActionCreator(isPreload) {
    return {
        type: ActionType.SET_IS_PRELOAD,
        payload: {
            isPreload
        }
    }
}

export function asyncPreloadProcess() {
    return async (dispatch) => {
        try {
            const authUser = await api.getOwnProfile();

            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            dispatch(setAuthUserActionCreator(null))
        } finally {
            dispatch(setIsPreloadActionCreator(false));
        }
    };
}