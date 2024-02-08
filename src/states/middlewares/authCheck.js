export default function authCheck(store) {
    return (next) => (action) => {
        const isAuthenticated = !!store.getState().authUser;

        const actionTypes = [
            'UPVOTE_THREAD',
            'DOWNVOTE_THREAD'
        ];

        if (!isAuthenticated && actionTypes.includes(action.type)) {
            alert('Please login first!');

            return;
        }

        return next(action);
    };
}