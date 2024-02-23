import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLoginHandler = ({ email, password }) => {
        dispatch(asyncSetAuthUser({ email, password, navigate }));
    };

    return (
        <div className="form-page">
            <h1>Login Page</h1>
            <LoginInput login={onLoginHandler} />
        </div>
    );
}