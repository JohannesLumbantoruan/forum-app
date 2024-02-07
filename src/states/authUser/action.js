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

export function asyncSetAuthUser({ email, password }) {
    return async (dispatch) => {
        try {
            const token = await api.login({ email, password});

            api.putAccessToken(token);

            const authUser = await api.getOwnProfile();

            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            alert(error.message);
        }
    };
}

export function asynUnsetAuthUser() {
    return (dispatch) => {
        dispatch(unsetAuthUserActionCreator());

        api.putAccessToken('');
    }
}