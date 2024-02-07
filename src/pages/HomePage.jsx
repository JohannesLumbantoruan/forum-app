import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
            <ul>
            {
                threads.map((thread) => (
                    <li key={thread.id}>{thread.body}</li>
                ))
            }
            </ul>
        </>
    );
}