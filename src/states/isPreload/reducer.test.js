/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when given unknown action
 *  - should return the isPreload when given SET_IS_PRELOAD action
 */

import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
    const initialState = true;

    it('should return the initial state when given unknown action', () => {
        // arrange
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = isPreloadReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the isPreload when given SET_IS_PRELOAD action', () => {
        // arrange
        const action = {
            type: 'SET_IS_PRELOAD',
            payload: {
                isPreload: false
            }
        };

        // action
        const nextState = isPreloadReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.isPreload);
    });
});