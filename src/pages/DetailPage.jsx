import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
import ThreadDetailFooter from '../components/ThreadDetailFooter';

export default function DetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        threadDetail,
        authUser
    } = useSelector((states) => states);

    useEffect(() => {
        dispatch(asyncReceiveThreadDetail(id));
    }, [dispatch, id]);

    if (!threadDetail) {
        return null;
    }

    return (
        <div className="thread-detail">
            <h2 className="thread-title">{threadDetail.title}</h2>
            <div className="thread-body">{parse(threadDetail.body)}</div>
            <ThreadDetailFooter thread={threadDetail} />
            {
                !authUser && <p className="login-to-comment">Please <Link to="/login">login</Link> to comment</p>
            }
            <div className="thread-comments">
                {
                    authUser && (
                    <CommentInput id={id} />
                  )
                }
                {
                    threadDetail.comments.map((comment) => (
                        <CommentItem comment={comment} key={comment.id} threadId={threadDetail.id} />
                    ))
                }
            </div>
        </div>
    );
}