import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreads } from '../states/threads/action';
import { asyncReceiveUsers } from '../states/users/action';
import ThreadItem from '../components/ThreadItem';
import { filterThreadsActionCreator } from '../states/filteredThreads/action';

export default function HomePage() {
    const dispatch = useDispatch();

    const {
        threads,
        categories,
        filteredThreads
    } = useSelector((states) => states);

    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        dispatch(asyncReceiveThreads());
        dispatch(asyncReceiveUsers());
    }, [dispatch]);

    const onCategoryChangeHandler = (event) => {
        const category = event.target.value;

        if (category === '') {
            setIsFiltered(false);

            return;
        }

        dispatch(filterThreadsActionCreator({ threads, category }));

        setIsFiltered(true);
    };

    return (
        <>
            <select onChange={onCategoryChangeHandler}>
                <option value="">category</option>
                {
                    categories.map((category) => (
                        <option value={category} key={category}>{category}</option>
                    ))
                }
            </select>
            <h2>Discussions</h2>
            <div className="thread-list">
                {
                    isFiltered
                    ? filteredThreads.map((thread) => (
                        <ThreadItem thread={thread} key={thread.id} />
                    ))
                    : threads.map((thread) => (
                        <ThreadItem thread={thread} key={thread.id} />
                    ))
                }
            </div>
        </>
    );
}