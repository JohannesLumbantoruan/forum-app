/**
 * test scenario for categoriesReducer
 *
 * - categoriesReducer function
 *  - should return the initial state when given unknown action
 *  - should return the categories when given RECEIVE_CATEGORIES action
 */

import { describe, expect, it } from 'vitest';
import categoriesReducer from './reducer';

describe('categoriesReducer function', () => {
    const initialState = [];

    it('should return the initial state when given unknown action', () => {
        // arrange
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = categoriesReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the categories when given RECEIVE_CATEGORIES action', () => {
        // arrange
        const categories = ['redux', 'perkenalan'];

        const action = {
            type: 'RECEIVE_CATEGORIES',
            payload: {
                categories
            }
        };

        // action
        const nextState = categoriesReducer(initialState, action);

        // assert
        expect(nextState).toEqual(categories);
    });
});