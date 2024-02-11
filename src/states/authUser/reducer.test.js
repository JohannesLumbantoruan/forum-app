/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given unknown action
 *  - should return the authUser when given SET_AUTH_USER action
 *  - should return null when given UNSET_AUTH_USER action
 */

import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';

describe('authUserReducer function', () => {
    const initialState = null;

    it('should return the initial state when given unknown action', () => {
        // arrange
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the authUser when given SET_AUTH_USER action', () => {
        // arrange
        const authUser = {
            id: 'johndoe',
            name: 'John Doe',
        };

        const action = {
            type: 'SET_AUTH_USER',
            payload: {
                authUser
            }
        };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.authUser);
    });

    it('should return null when given UNSET_AUTH_USER action', () => {
        // arrange
        const action = {
            type: 'UNSET_AUTH_USER'
        };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(null);
    });
});