import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';
import { receiveCategoriesActionCreator } from '../categories/action';

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

export function asyncReceiveThreads() {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const threads = await api.getAllThreads();

            const categories = [];

            for (const thread of threads) {
                if (!categories.includes(thread.category)) {
                    categories.push(thread.category);
                }
            }

            dispatch(receiveThreadsActionCreator(threads));
            dispatch(receiveCategoriesActionCreator(categories));
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}

export function asyncAddThread({ title, body, category }) {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const thread = await api.createThread({ title, body, category });

            dispatch(addThreadActionCreator(thread));
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}

export function asyncUpvoteThread(threadId) {
    return async (dispatch, getState) => {
        if (getState().authUser === null) {
            alert('Please login first!');

            return;
        }

        dispatch(showLoading());

        const { id: userId } = getState().authUser;

        const votedThread = getState().threads.find((thread) => thread.id === threadId);

        const isDownvote = votedThread.downVotesBy.includes(userId);

        try {
            dispatch(upvoteThreadActionCreator({ userId, threadId }));

            await api.upvoteThread(threadId);
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteActionCreator({ userId, threadId }));

            if (isDownvote) {
                dispatch(downvoteThreadActionCreator({ userId, threadId }));
            }
        }

        dispatch(hideLoading());
    };
}

export function asyncDownvoteThread(threadId) {
    return async (dispatch, getState) => {
        if (getState().authUser === null) {
            alert('Please login first!');

            return;
        }

        dispatch(showLoading());

        const { id: userId } = getState().authUser;

        const votedThread = getState().threads.find((thread) => thread.id === threadId);

        const isUpvote = votedThread.upVotesBy.includes(userId);

        try {
            dispatch(downvoteThreadActionCreator({ userId, threadId }));

            await api.downvoteThread(threadId);
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteActionCreator({ userId, threadId }));

            if (isUpvote) {
                dispatch(upvoteThreadActionCreator({ userId, threadId }));
            }
        }

        dispatch(hideLoading());
    };
}

export function asyncNeutralizeVoteThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());

        const { authUser: { id: userId } } = getState();

        const votedThread = getState().threads.find((thread) => thread.id === threadId);

        const isUpvote = votedThread.upVotesBy.includes(userId);
        const isDownvote = votedThread.downVotesBy.includes(userId);

        try {
            dispatch(neutralizeVoteActionCreator({ userId, threadId }));

            await api.neutralizeThread(threadId);
        } catch (error) {
            alert(error.message);

            if (isUpvote) {
                dispatch(upvoteThreadActionCreator({ userId, threadId }));
            }

            if (isDownvote) {
                dispatch(downvoteThreadActionCreator({ userId, threadId }));
            }
        }

        dispatch(hideLoading());
    };
}