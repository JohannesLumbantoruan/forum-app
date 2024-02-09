import { ActionType } from './action';

export default function filteredThreadsReducer(filteredThreads = [], action = {}) {
    switch (action.type) {
        case ActionType.FILTER_THREADS:
            const { threads, category } = action.payload;

            return threads.filter((thread) => thread.category === category);
        default:
            return filteredThreads;
    }
}