/**
 * test scenario for users thunks
 *
 * - asyncReceiveUsers thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
    afterEach, beforeEach, describe, expect, it, vi
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';
import { asyncReceiveUsers, asyncRegisterUser, receiveUsersActionCreator } from './action';

const fakeErrorResponse = new Error('Internal server error');

describe('asyncReceiveUsers thunk', () => {
    const fakeReceiveUsersResponse = [
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

    beforeEach(() => {
        api._getAllUsers = api.getAllUsers;
    });

    afterEach(() => {
        api.getAllUsers = api._getAllUsers;

        delete api._getAllUsers;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.getAllUsers = () => Promise.resolve(fakeReceiveUsersResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncReceiveUsers()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeReceiveUsersResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getAllUsers = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncReceiveUsers()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});

describe('asyncRegisterUser thunk', () => {
    const fakeRegisterUserResponse = {
        status: 'success',
        message: 'user created',
        data: {
            user: {
                id: 'user-CMMT68pYHRXAR1Ot',
                name: 'Ken Thompson',
                email: 'kenthompson@mail.com',
                avatar: 'https://ui-avatars.com/api/?name=Ken Thompson&background=random'
            }
        }
    };

    beforeEach(() => {
        api._register = api.register;
    });

    afterEach(() => {
        api.register = api._register;

        delete api._register;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.register = () => Promise.resolve(fakeRegisterUserResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncRegisterUser({
            name: 'Ken Thompson',
            email: 'kenthompson@mail.com',
            password: 'kenthompson'
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.register = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncRegisterUser({
            name: 'Ken Thompson',
            email: 'kenthompson@mail.com',
            password: 'kenthompson'
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});