import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { asyncAddComment, asyncReceiveThreadDetail } from '../states/threadDetail/action';
import useInput from '../hooks/useInput';

export default function DetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        threadDetail,
        authUser
    } = useSelector((states) => states);

    const [content, onContentChangeHandler] = useInput('');

    useEffect(() => {
        dispatch(asyncReceiveThreadDetail(id));
    }, [dispatch, id]);

    const onAddCommentHandler = (event) => {
        event.preventDefault();

        dispatch(asyncAddComment({ id, content }));
    };

    if (!threadDetail) {
        return null;
    }

    return (
        <div className="thread-detail">
            <h2 className='thread-title'>{threadDetail.title}</h2>
            <div className="thread-body">{parse(threadDetail.body)}</div>
            <div className="thread-comments">
                {authUser &&
                    <form className="form-control" id="comment-form" onSubmit={onAddCommentHandler}>
                        <input type="text" placeholder="Type your comment" value={content} onChange={onContentChangeHandler} required />
                        <button>Comment</button>
                    </form>
                }
                {
                    threadDetail.comments.map((comment) => (
                        <div className="comment-item" key={comment.id}>
                            <h3>{comment.owner.name}</h3>
                            <div className="comment-body">{parse(comment.content)}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}