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

export function asyncRegisterUser({ name, email, password }) {
    return async () => {
        try {
            await api.register({ name, email, password });
        } catch (error) {
            alert(error.message);
        }
    };
}