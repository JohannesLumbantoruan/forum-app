import api from '../../data/api';

export const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    ADD_THREAD: 'ADD_THREAD',
    UPVOTE_THREAD: 'UPVOTE_THREAD',
    DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
    NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD'
};

export function receiveThreadsActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads
        }
    };
}

export function addThreadActionCreator(thread) {
    return {
        type: ActionType.ADD_THREAD,
        payload: {
            thread
        }
    };
}

export function upvoteThreadActionCreator({ userId, threadId }) {
    return {
        type: ActionType.UPVOTE_THREAD,
        payload: {
            userId,
            threadId
        }
    };
}

export function downvoteThreadActionCreator({ userId, threadId }) {
    return {
        type: ActionType.DOWNVOTE_THREAD,
        payload: {
            userId,
            threadId
        }
    };
}

export function neutralizeVoteActionCreator({ userId, threadId }) {
    return {
        type: ActionType.NEUTRALIZE_VOTE_THREAD,
        payload: {
            userId,
            threadId
        }
    };
}

export function asyncreceiveThreads() {
    return async (dispatch) => {
        try {
            const threads = await api.getAllThreads();

            dispatch(receiveThreadsActionCreator(threads));
        } catch (error) {
            alert(error.message);
        }
    };
}

export function asyncAddThread({ title, body, category }) {
    return async (dispatch) => {
        try {
            const thread = await api.createThread({ title, body, category });

            dispatch(addThreadActionCreator(thread));
        } catch (error) {
            alert(error.message);
        }
    };
}

export function asyncUpvoteThread(threadId) {
    return async (dispatch, getState) => {
        const { id: userId = null } = getState().authUser ?? {};

        try {
            dispatch(upvoteThreadActionCreator({ userId, threadId }));

            await api.upvoteThread(threadId);
        } catch (error) {
            alert(error.message);
        }
    };
}

export function asyncDownvoteThread(threadId) {
    return async (dispatch, getState) => {
        const { id: userId } = getState().authUser ?? {};

        try {
            dispatch(downvoteThreadActionCreator({ userId, threadId }));

            await api.downvoteThread(threadId);
        } catch (error) {
            alert(error.message);
        }
    };
}

export function asyncNeutralizeVoteThread(threadId) {
    return async (dispatch, getState) => {
        try {
            await api.neutralizeThread(threadId);

            const { authUser: { id: userId } } = getState();

            dispatch(neutralizeVoteActionCreator({ userId, threadId }));
        } catch (error) {
            alert(error.message);
        }
    };
}