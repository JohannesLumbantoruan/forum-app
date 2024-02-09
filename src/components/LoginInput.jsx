import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

export default function LoginInput({ login }) {
    const [email, onEmailChangeHandler] = useInput('');
    const [password, onPasswordChangeHandler] = useInput('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        login({ email, password });
    };

    return (
        <form className="form-control" onSubmit={onSubmitHandler} id="login-form">
            <input type="email" placeholder="Email" value={email} onChange={onEmailChangeHandler} required />
            <input type="password" placeholder="Password" value={password} onChange={onPasswordChangeHandler} required />
            <button>Login</button>
            <p>Do not have an account yet? Register <Link to="/register">here</Link></p>
        </form>
    );
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired
};