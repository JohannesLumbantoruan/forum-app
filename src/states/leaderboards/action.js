import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';

export const ActionType = {
    RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS'
};

export function receiveleaderboardsActionCreator(leaderboards) {
    return {
        type: ActionType.RECEIVE_LEADERBOARDS,
        payload: {
            leaderboards
        }
    };
}

export function asyncReceiveLeaderboard() {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const leaderboards = await api.getLeaderboards();

            dispatch(receiveleaderboardsActionCreator(leaderboards));
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}