import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import CommentFooter from './CommentFooter';
import postedAt from '../utils/postedAt';

export default function CommentItem({ comment, threadId }) {
    return (
        <div className="comment-item" key={comment.id}>
            <h3 className="comment-title"><span><img src={comment.owner.avatar} alt={comment.owner.name} className="avatar" />{comment.owner.name}</span><span>{postedAt(comment.createdAt)}</span></h3>
            <div className="comment-body">{parse(comment.content)}</div>
            <CommentFooter comment={comment} threadId={threadId} />
        </div>
    );
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    threadId: PropTypes.string.isRequired
};