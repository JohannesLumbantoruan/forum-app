import { ActionType } from './action';

export default function threadDetailReducer(threadDetail = null, action = {}) {
    switch (action.type) {
        case ActionType.RECEIVE_THREAD_DETAIL:
            return action.payload.threadDetail;
        case ActionType.CLEAR_THREAD_DETAIL:
            return null;
        case ActionType.ADD_COMMENT:
            return {
                ...threadDetail,
                comments: [action.payload.comment, ...threadDetail.comments]
            };
        case ActionType.UPVOTE_COMMENT:
            return {
                ...threadDetail,
                comments: threadDetail.comments.map((comment) => {
                    if (comment.id === action.payload.commentId) {
                        return {
                            ...comment,
                            upVotesBy: comment.upVotesBy.concat(action.payload.userId),
                            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId)
                        };
                    }

                    return comment;
                })
            };
        case ActionType.DOWNVOTE_COMMENT:
            return {
                ...threadDetail,
                comments: threadDetail.comments.map((comment) => {
                    if (comment.id === action.payload.commentId) {
                        return {
                            ...comment,
                            downVotesBy: comment.downVotesBy.concat(action.payload.userId),
                            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId)
                        };
                    }

                    return comment;
                })
            };
        case ActionType.NEUTRALIZE_VOTE_COMMENT:
            return {
                ...threadDetail,
                comments: threadDetail.comments.map((comment) => {
                    if (comment.id === action.payload.commentId) {
                        return {
                            ...comment,
                            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
                            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId)
                        };
                    }

                    return comment;
                })
            };
        case ActionType.UPVOTE_DETAIL_THREAD:
            return {
                ...threadDetail,
                upVotesBy: threadDetail.upVotesBy.concat(action.payload.userId),
                downVotesBy: threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId)
            };
        case ActionType.DOWNVOTE_DETAIL_THREAD:
            return {
                ...threadDetail,
                downVotesBy: threadDetail.downVotesBy.concat(action.payload.userId),
                upVotesBy: threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId)
            };
        case ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD:
            return {
                ...threadDetail,
                upVotesBy: threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId),
                downVotesBy: threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId)
            };
        default:
            return threadDetail;
    }
}