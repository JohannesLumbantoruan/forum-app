import api from '../../data/api';

export const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
    ADD_COMMENT: 'ADD_COMMENT',
    UPVOTE_COMMENT: 'UPVOTE_COMMENT',
    DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
    NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT'
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

export function asyncAddComment({ id, content}) {
    return async (dispatch) => {
        try {
            const comment = await api.createThreadComment({ id, content});

            dispatch(addCommentActionCreator(comment));
        } catch (error) {
            alert(error.message);
        }
    };
}

export function asyncUpvoteComment(commentId) {
    return async (dispatch, getState) => {
        const { authUser: { id: userId }, threadDetail } = getState();

        const isDownvote = threadDetail.downVotesBy.includes(userId);

        dispatch(upvoteCommentActionCreator({ commentId, userId }));

        try {
            await api.upvoteComment(commentId);
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));

            if (isDownvote) {
                dispatch(downvoteCommentActionCreator({ commentId, userId }));
            }

        }
    };
}

export function asyncDownvoteComment(commentId) {
    return async (dispatch, getState) => {
        const { authUser: { id: userId }, threadDetail } = getState();

        const isUpvote = threadDetail.upVotesBy.includes(userId);

        dispatch(downvoteCommentActionCreator({ commentId, userId }));

        try {
            await api.downvoteComment(commentId);
        } catch (error) {
            alert(error.message);

            dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
            
            if (isUpvote) {
                dispatch(upvoteCommentActionCreator({ commentId, userId }));
            }

        }
    };
}

export function asyncNeutralizeVoteComment(commentId) {
    return async (dispatch, getState) => {
        const { authUser: { id: userId }, threadDetail } = getState();

        const isUpvote = threadDetail.upVotesBy.includes(userId);
        const isDownvote = threadDetail.isDownvote.includes(userId);

        dispatch(downvoteCommentActionCreator({ commentId, userId }));

        try {
            await api.neutralizeComment(commentId);
        } catch (error) {
            alert(error.message);

            if (isUpvote) {
                dispatch(upvoteCommentActionCreator({ commentId, userId }));
            }

            if (isDownvote) {
                dispatch(downvoteCommentActionCreator({ commentId, userId }));
            }
        }
    };
}