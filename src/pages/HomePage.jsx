import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncreceiveThreads } from '../states/threads/action';
import { asyncReceiveUsers } from '../states/users/action';
import ThreadItem from '../components/ThreadItem';

export default function HomePage() {
    const dispatch = useDispatch();

    const threads = useSelector((states) => states.threads);

    useEffect(() => {
        dispatch(asyncreceiveThreads());
        dispatch(asyncReceiveUsers());
    }, [dispatch]);

    return (
        <>
            <h2>Discussions</h2>
            <div className="thread-list">
                {
                    threads.map((thread) => (
                        <ThreadItem thread={thread} key={thread.id} />
                    ))
                }
            </div>
        </>
    );
}