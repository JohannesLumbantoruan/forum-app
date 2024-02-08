import {
    AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike
} from 'react-icons/ai';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDownvoteComment, asyncNeutralizeVoteComment, asyncUpvoteComment } from '../states/threadDetail/action';

export default function CommentFooter({ comment, threadId }) {
    const commentId = comment.id;
    const authUser = useSelector((states) => states.authUser);

    const dispatch = useDispatch();

    const onUpvoteCommentHandler = () => {
        dispatch(asyncUpvoteComment({ threadId, commentId }));
    };

    const onDownvoteCommentHandler = () => {
        dispatch(asyncDownvoteComment({ threadId, commentId }));
    };

    const onNeutralizeVoteCommentHandler = () => {
        dispatch(asyncNeutralizeVoteComment({ threadId, commentId }));
    };

    return (
        <div className="comment-item" key={comment.id}>
            <h3><img src={comment.owner.avatar} alt={comment.owner.name} className="avatar" />{comment.owner.name}</h3>
            <div className="comment-body">{parse(comment.content)}</div>
            <div className="comment-data">
                <div className="comment-data__upvote">
                    {
                        comment.upVotesBy?.includes(authUser.id)
                        ? <AiFillLike onClick={onNeutralizeVoteCommentHandler} />
                        : <AiOutlineLike onClick={onUpvoteCommentHandler} />
                    }
                    <span className="thread-data__value">{comment.upVotesBy.length}</span>
                </div>
                <div className="comment-data__downvote">
                    {
                        comment.downVotesBy?.includes(authUser.id)
                        ? <AiFillDislike onClick={onNeutralizeVoteCommentHandler} />
                        : <AiOutlineDislike onClick={onDownvoteCommentHandler} />
                    }
                    <span className="thread-data__value">{comment.downVotesBy.length}</span>
                </div>
            </div>
        </div>
    );
}

CommentFooter.propTypes = {
    comment: PropTypes.object.isRequired,
    threadId: PropTypes.string.isRequired
};