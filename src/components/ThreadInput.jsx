import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function ThreadInput({ addThread }) {
    const [title, onTitleChangeHandler] = useInput('');
    const [body, onBodyChangeHandler] = useInput('');
    const [category, onCategoryChangeHandler] = useInput('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        addThread({ title, body, category });
    };

    return (
        <form className='form-control' onSubmit={onSubmitHandler} id="add-thread-form">
            <input type="text" placeholder="Title" value={title} onChange={onTitleChangeHandler} required />
            <input type="text" placeholder="Category" value={category} onChange={onCategoryChangeHandler} required />
            <textarea rows="5" placeholder="Body" value={body} onChange={onBodyChangeHandler} required></textarea>
            <button>Add Thread</button>
        </form>
    );
}

ThreadInput.propTypes = {
    addThread: PropTypes.func.isRequired
};