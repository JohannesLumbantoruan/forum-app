import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { BiConversation } from 'react-icons/bi';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export default function Navigation() {
    const authUser = useSelector((states) => states.authUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogoutHandler = () => {
        dispatch(asyncUnsetAuthUser());

        navigate('/login');
    };

    return (
        <nav>
            <h1>Forum App</h1>
            <ul>
                <li><Link to="/"><BiConversation /></Link></li>
                <li><Link to="/leaderboards"><MdOutlineLeaderboard /></Link></li>
                {
                    authUser
                    ? (
<>
                        <li><Link to="/threads/add"><FaPlus /></Link></li>
                        <li>{authUser.name} <button onClick={onLogoutHandler}><FiLogOut /></button></li>
</>
)
                    : <li><Link to="/login"><FiLogIn /></Link></li>
                }
            </ul>
        </nav>
    );
}