import {
 AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike
} from 'react-icons/ai';
import { IoChatboxEllipses } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import postedAt from '../utils/postedAt';
import { asyncDownvoteThread, asyncNeutralizeVoteThread, asyncUpvoteThread } from '../states/threads/action';

export default function ThreadFooter({ thread }) {
    const {
        authUser,
        users
    } = useSelector((states) => states);

    const dispatch = useDispatch();

    const onUpvoteThreadHandler = () => {
        dispatch(asyncUpvoteThread(thread.id));
    };

    const onDownvoteThreadHandler = () => {
        dispatch(asyncDownvoteThread(thread.id));
    };

    const onNeutralizeVoteThreadHandler = () => {
        dispatch(asyncNeutralizeVoteThread(thread.id));
    };

    const owner = users.find((user) => user.id === thread.ownerId);

    return (
        <div className="thread-data">
            <div className="thread-data__upvote">
                {
                    thread.upVotesBy.includes(authUser?.id)
                    ? <AiFillLike onClick={onNeutralizeVoteThreadHandler} />
                    : <AiOutlineLike onClick={onUpvoteThreadHandler} />
                }
                <span className="thread-data__value">{thread.upVotesBy.length}</span>
            </div>
            <div className="thread-data__downvote">
                {
                    thread.downVotesBy.includes(authUser?.id)
                    ? <AiFillDislike onClick={onNeutralizeVoteThreadHandler} />
                    : <AiOutlineDislike onClick={onDownvoteThreadHandler} />
                }
                <span className="thread-data__value">{thread.downVotesBy.length}</span>
            </div>
            <div className="thread-data__comments">
                <IoChatboxEllipses />
                <span className="thread-data__value">{thread.totalComments}</span>
            </div>
            <div className="thread-data__time-created">
                <p>{postedAt(thread.createdAt)}</p>
            </div>
            <div className="thread-data__owner">
                <p><span>Posted by</span><img className="avatar" src={owner.avatar} alt={owner.name} /><span>{owner.name}</span></p>
            </div>
        </div>
    );
}

ThreadFooter.propTypes = {
    thread: PropTypes.object.isRequired
};