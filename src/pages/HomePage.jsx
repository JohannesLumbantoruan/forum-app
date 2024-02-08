import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { asyncAddThread, asyncreceiveThreads } from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';

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
            <h2>Home Page</h2>
            {authUser && <ThreadInput addThread={onAddThreadHandler} />}
            <div className="thread-list">
                {
                    threads.map((thread) => (
                        <div className="threads-item" key={thread.id}>
                            <h3 className="thread-title">
                                <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
                            </h3>
                            <div className="thread-body">{parse(thread.body)}</div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}