import api from '../../data/api';

export const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL'
};

export function receiveThreadDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            threadDetail
        }
    };
}

export function clearThreadDetailActionCreator() {
    return {
        type: ActionType.CLEAR_THREAD_DETAIL
    };
}

export function asyncReceiveThreadDetail(id) {
    return async (dispatch) => {
        dispatch(clearThreadDetailActionCreator());

        try {
            const threadDetail = await api.getThreadDetail(id);

            dispatch(receiveThreadDetailActionCreator(threadDetail));
        } catch (error) {
            alert(error.message);
        }
    };
}