import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRegisterHandler = ({ name, email, password }) => {
        dispatch(asyncRegisterUser({ name, email, password }));

        navigate('/');
    };

    return (
        <div className="form-page">
            <h1>Register Page</h1>
            <RegisterInput register={onRegisterHandler} />
        </div>
    );
}