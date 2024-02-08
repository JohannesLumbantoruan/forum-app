import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { asyncAddComment } from '../states/threadDetail/action';

export default function CommentInput({ id }) {
    const [content, onContentChangeHandler] = useInput('');

    const dispatch = useDispatch();

    const onAddCommentHandler = (event) => {
        event.preventDefault();

        dispatch(asyncAddComment({ id, content }));
    };

    return (
        <form className="form-control" id="comment-form" onSubmit={onAddCommentHandler}>
            <textarea rows="3" placeholder="Type your comment" value={content} onChange={onContentChangeHandler} required />
            <button>Comment</button>
        </form>
    );
}

CommentInput.propTypes = {
    id: PropTypes.string.isRequired
};