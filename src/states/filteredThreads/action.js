export const ActionType = {
    FILTER_THREADS: 'FILTER_THREADS'
};

export function filterThreadsActionCreator({ threads, category }) {
    return {
        type: ActionType.FILTER_THREADS,
        payload: {
            threads,
            category
        }
    };
}