import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

export default function AddPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddThreadHandler = (thread) => {
        dispatch(asyncAddThread(thread));

        navigate('/');
    };

    return (
        <div className="form-page" id="add-thread-page">
            <h2>Add Thread</h2>
            <ThreadInput addThread={onAddThreadHandler} />
        </div>
    );
}