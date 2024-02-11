import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';

export const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
    ADD_COMMENT: 'ADD_COMMENT',
    UPVOTE_COMMENT: 'UPVOTE_COMMENT',
    DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
    NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
    UPVOTE_DETAIL_THREAD: 'UPVOTE_DETAIL_THREAD',
    DOWNVOTE_DETAIL_THREAD: 'DOWNVOTE_DETAIL_THREAD',
    NEUTRALIZE_VOTE_DETAIL_THREAD: 'NEUTRALIZE_VOTE_DETAIL_THREAD'
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

export function addCommentActionCreator(comment) {
    return {
        type: ActionType.ADD_COMMENT,
        payload: {
            comment
        }
    };
}

export function upvoteCommentActionCreator({ commentId, userId }) {
    return {
        type: ActionType.UPVOTE_COMMENT,
        payload: {
            commentId,
            userId
        }
    };
}

export function downvoteCommentActionCreator({ commentId, userId }) {
    return {
        type: ActionType.DOWNVOTE_COMMENT,
        payload: {
            commentId,
            userId
        }
    };
}

export function neutralizeVoteCommentActionCreator({ commentId, userId }) {
    return {
        type: ActionType.NEUTRALIZE_VOTE_COMMENT,
        payload: {
            commentId,
            userId
        }
    };
}

export function upvoteThreadActionCreator({ userId }) {
    return {
        type: ActionType.UPVOTE_DETAIL_THREAD,
        payload: {
            userId
        }
    };
}

export function downvoteThreadActionCreator({ userId }) {
    return {
        type: ActionType.DOWNVOTE_DETAIL_THREAD,
        payload: {
            userId
        }
    };
}

export function neutralizeVoteActionCreator({ userId }) {
    return {
        type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
        payload: {
            userId
        }
    };
}

export function asyncReceiveThreadDetail(id) {
    return async (dispatch) => {
        dispatch(showLoading());

        dispatch(clearThreadDetailActionCreator());

        try {
            const threadDetail = await api.getThreadDetail(id);

            dispatch(receiveThreadDetailActionCreator(threadDetail));
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}

export function asyncAddComment({ id, content }) {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const comment = await api.createThreadComment({ id, content });

            dispatch(addCommentActionCreator(comment));
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}

export function asyncUpvoteComment({ threadId, commentId }) {
    return async (dispatch, getState) => {
        if (getState().authUser === null) {
            alert('Please login first!');

            return;
        }

        dispatch(showLoading());

        const { authUser: { id: userId }, threadDetail } = getState();

        const isDownvote = threadDetail.comments.find((comment) => comment.id === commentId)?.downVotesBy.includes(userId);

        dispatch(upvoteCommentActionCreator({ commentId, userId }));

        try {
            await api.upvoteComment({ threadId, commentId });
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));

            if (isDownvote) {
                dispatch(downvoteCommentActionCreator({ commentId, userId }));
            }
        }

        dispatch(hideLoading());
    };
}

export function asyncDownvoteComment({ threadId, commentId }) {
    return async (dispatch, getState) => {
        if (getState().authUser === null) {
            alert('Please login first!');

            return;
        }

        dispatch(showLoading());

        const { authUser: { id: userId }, threadDetail } = getState();

        const isUpvote = threadDetail.comments.find((comment) => comment.id === commentId)?.upVotesBy.includes(userId);

        dispatch(downvoteCommentActionCreator({ commentId, userId }));

        try {
            await api.downvoteComment({ threadId, commentId });
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));

            if (isUpvote) {
                dispatch(upvoteCommentActionCreator({ commentId, userId }));
            }
        }

        dispatch(hideLoading());
    };
}

export function asyncNeutralizeVoteComment({ threadId, commentId }) {
    return async (dispatch, getState) => {
        dispatch(showLoading());

        const { authUser: { id: userId }, threadDetail } = getState();

        const isUpvote = threadDetail.comments.find((comment) => comment.id === commentId)?.upVotesBy.includes(userId);
        const isDownvote = threadDetail.comments.find((comment) => comment.id === commentId)?.downVotesBy.includes(userId);

        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));

        try {
            await api.neutralizeComment({ threadId, commentId });
        } catch (error) {
            alert(error.message);

            if (isUpvote) {
                dispatch(upvoteCommentActionCreator({ commentId, userId }));
            }

            if (isDownvote) {
                dispatch(downvoteCommentActionCreator({ commentId, userId }));
            }
        }

        dispatch(hideLoading());
    };
}

export function asyncUpvoteThread() {
    return async (dispatch, getState) => {
        if (getState().authUser === null) {
            alert('Please login first!');

            return;
        }

        dispatch(showLoading());

        const { authUser: { id: userId }, threadDetail } = getState();

        const isDownvote = threadDetail.downVotesBy.includes(userId);

        try {
            dispatch(upvoteThreadActionCreator({ userId }));

            await api.upvoteThread(threadDetail.id);
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteActionCreator({ userId }));

            if (isDownvote) {
                dispatch(downvoteThreadActionCreator({ userId }));
            }
        }

        dispatch(hideLoading());
    };
}

export function asyncDownvoteThread() {
    return async (dispatch, getState) => {
        if (getState().authUser === null) {
            alert('Please login first!');

            return;
        }

        dispatch(showLoading());

        const { authUser: { id: userId }, threadDetail } = getState();

        const isUpvote = threadDetail.upVotesBy.includes(userId);

        try {
            dispatch(downvoteThreadActionCreator({ userId }));

            await api.downvoteThread(threadDetail.id);
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteActionCreator({ userId }));

            if (isUpvote) {
                dispatch(upvoteThreadActionCreator({ userId }));
            }
        }

        dispatch(hideLoading());
    };
}

export function asyncNeutralizeVoteThread() {
    return async (dispatch, getState) => {
        dispatch(showLoading());

        const { authUser: { id: userId }, threadDetail } = getState();

        const isUpvote = threadDetail.upVotesBy.includes(userId);
        const isDownvote = threadDetail.downVotesBy.includes(userId);

        try {
            dispatch(neutralizeVoteActionCreator({ userId }));

            await api.neutralizeThread(threadDetail.id);
        } catch (error) {
            alert(error.message);

            if (isUpvote) {
                dispatch(upvoteThreadActionCreator({ userId }));
            }

            if (isDownvote) {
                dispatch(downvoteThreadActionCreator({ userId }));
            }
        }

        dispatch(hideLoading());
    };
}