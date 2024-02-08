import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { asyncreceiveThreads } from '../states/threads/action';

export default function HomePage() {
    const dispatch = useDispatch();

    const threads = useSelector((states) => states.threads);

    useEffect(() => {
        dispatch(asyncreceiveThreads());
    }, [dispatch]);

    return (
        <>
            <h2>Home Page</h2>
            <div className="thread-list">
                {
                    threads.map((thread) => (
                        <div className="threads-item" key={thread.id}>
                            <h3 className="thread-title">
                                <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
                            </h3>
                            <p className="thread-body">{parse(thread.body)}</p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}