import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { IoChatboxEllipses } from 'react-icons/io5';
import { asyncAddThread, asyncreceiveThreads } from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';
import postedAt from '../utils/postedAt';

export default function HomePage() {
    const dispatch = useDispatch();

    const {
        threads,
        authUser
    } = useSelector((states) => states);

    useEffect(() => {
        dispatch(asyncreceiveThreads());
    }, [dispatch]);

    const onAddThreadHandler = (thread) => {
        dispatch(asyncAddThread(thread));
    };

    return (
        <>
            <h2>Discussions</h2>
            {authUser && <ThreadInput addThread={onAddThreadHandler} />}
            <div className="thread-list">
                {
                    threads.map((thread) => (
                        <div className="threads-item" key={thread.id}>
                            <h3 className="thread-title">
                                <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
                            </h3>
                            <div className="thread-body">{parse(thread.body)}</div>
                            <div className="thread-data">
                                <div className="thread-data__upvote">
                                    {thread.upVotesBy.includes(authUser?.id)
                                        ? <AiFillLike />
                                        : <AiOutlineLike />            
                                    }
                                    <span className="thread-data__value">{thread.upVotesBy.length}</span>
                                </div>
                                <div className="thread-data__downvote">
                                    {thread.downVotesBy.includes(authUser?.id)
                                        ? <AiFillDislike />
                                        : <AiOutlineDislike />
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
                                    <p>{thread.ownerId}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}