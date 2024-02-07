import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function RegisterInput({ register }) {
    const [name, onNameChangeHandler] = useInput('');
    const [email, onEmailChangeHandler] = useInput('');
    const [password, onPasswordChangeHandler] = useInput('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        register({ name, email, password });
    };

    return (
        <form onSubmit={onSubmitHandler} className="auth-form">
            <input type="text" placeholder="Name" value={name} onChange={onNameChangeHandler} required="" />
            <input type="email" placeholder="Email" value={email} onChange={onEmailChangeHandler} required="" />
            <input type="password" placeholder="Password" value={password} onChange={onPasswordChangeHandler} required="" />
            <button>Register</button>
        </form>
    );
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired
};