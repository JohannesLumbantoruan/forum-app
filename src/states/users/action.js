import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';

export const ActionType = {
    RECEIVE_USERS: 'RECEIVE_USERS'
};

export function receiveUsersActionCreator(users) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: {
            users
        }
    };
}

export function asyncReceiveUsers() {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const users = await api.getAllUsers();

            dispatch(receiveUsersActionCreator(users));
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}

export function asyncRegisterUser({
    name, email, password, navigate
}) {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            await api.register({ name, email, password });

            navigate('/login');
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}