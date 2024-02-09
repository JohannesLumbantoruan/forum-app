export const ActionType = {
    RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES'
};

export function receiveCategoriesActionCreator(categories) {
    return {
        type: ActionType.RECEIVE_CATEGORIES,
        payload: {
            categories
        }
    };
}