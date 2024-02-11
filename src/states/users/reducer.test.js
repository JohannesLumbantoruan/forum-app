/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *  - should return the initial state when given unknown action
 *  - should return the users when given RECEIVE_USERS actioni
 */

import { describe, expect, it } from 'vitest';
import usersReducer from './reducer';

const initialState = [];

describe('usersReducer function', () => {
    it('should return the initial state when given unknown action', () => {
        // arrange
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = usersReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the users when given RECEIVE_USERS actioni', () => {
        // arrange
        const users = [
            {
                id: 'johndoe',
                name: 'John Doe',
                email: 'johndoe@mail.com',
                avatar: 'https://avatar.com/johndoe'
            },
            {
                id: 'janedoe',
                name: 'Jane Doe',
                email: 'janedoe@mail.com',
                avatar: 'https://avatar.com/janedoe'
            }
        ];
        const action = {
            type: 'RECEIVE_USERS',
            payload: {
                users
            }
        };

        // action
        const nextState = usersReducer(initialState, action);

        // assert
        expect(nextState).toEqual(users);
    });
});