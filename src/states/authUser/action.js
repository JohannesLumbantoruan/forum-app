import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';

export const ActionType = {
    SET_AUTH_USER: 'SET_AUTH_USER',
    UNSET_AUTH_USER: 'UNSET_AUTH_USER'
};

export function setAuthUserActionCreator(authUser) {
    return {
        type: ActionType.SET_AUTH_USER,
        payload: {
            authUser
        }
    };
}

export function unsetAuthUserActionCreator() {
    return {
        type: ActionType.UNSET_AUTH_USER
    };
}

export function asyncSetAuthUser({ email, password, navigate }) {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const token = await api.login({ email, password });

            api.putAccessToken(token);

            const authUser = await api.getOwnProfile();

            dispatch(setAuthUserActionCreator(authUser));

            navigate('/');
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}

export function asyncUnsetAuthUser() {
    return (dispatch) => {
        dispatch(unsetAuthUserActionCreator());

        api.putAccessToken('');
    };
}