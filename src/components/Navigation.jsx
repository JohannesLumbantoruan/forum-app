import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { BiConversation } from 'react-icons/bi';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export default function Navigation() {
    const authUser = useSelector((states) => states.authUser);

    const dispatch = useDispatch();

    const onLogoutHandler = () => {
        dispatch(asyncUnsetAuthUser());
    };

    return (
        <nav>
            <h1>Forum App</h1>
            <ul>
                <li><Link to="/"><BiConversation /></Link></li>
                <li><Link to="/leaderboards"><MdOutlineLeaderboard /></Link></li>
                {
                    authUser
                    ? <li>{authUser.name} <button onClick={onLogoutHandler}><FiLogOut /></button></li>
                    : <li><Link to="/login"><FiLogIn /></Link></li>
                }
            </ul>
        </nav>
    );
}