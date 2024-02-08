import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import ThreadFooter from './ThreadFooter';

export default function ThreadItem({ thread }) {
    return (
        <div className="threads-item" key={thread.id}>
            <h3 className="thread-title">
                <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
            </h3>
            <div className="thread-body">{parse(thread.body)}</div>
            <ThreadFooter thread={thread} />
        </div>
    );
}

ThreadItem.propTypes = {
    thread: PropTypes.object.isRequired
};