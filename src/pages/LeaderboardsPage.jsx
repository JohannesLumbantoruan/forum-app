import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboard } from '../states/leaderboards/action';

export default function LeaderboardsPage() {
    const leaderboards = useSelector((states) => states.leaderboards);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncReceiveLeaderboard());
    }, [dispatch]);

    return (
        <>
            <h2 className="page-title">Leaderboards</h2>
            <ul className="leaderboards-list">
                {
                    leaderboards.map((data) => (
                        <li key={data.user.id}>
                            <span className="leaderboards__user">
                                <img src={data.user.avatar} alt={data.user.name} />
                                {data.user.name}
                            </span>
                            <span className="leaderboards__score">{data.score}</span>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}