import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import CommentInput from '../components/CommentInput';
import CommentFooter from '../components/CommentFooter';

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
            <div className="thread-comments">
                {
                    authUser && (
                    <CommentInput id={id} />
                  )
                }
                {
                    threadDetail.comments.map((comment) => (
                        <CommentFooter comment={comment} key={comment.id} threadId={threadDetail.id} />
                    ))
                }
            </div>
        </div>
    );
}