import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

export default function LoginPage() {
    const dispatch = useDispatch();
    
    const onLoginHandler = ({ email, password }) => {
        dispatch(asyncSetAuthUser({ email, password }));
    }
    return (
        <div className="auth-page">
            <h1>Login Page</h1>
            <LoginInput login={onLoginHandler} />
        </div>
    );
}