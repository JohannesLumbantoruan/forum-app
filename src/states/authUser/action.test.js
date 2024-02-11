/**
 * test scenario for thunk
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching sucess
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly
 */

import {
    afterEach, beforeEach, describe, expect, it, vi
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';
import {
    asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator
} from './action';

const fakeAuthUserResponse = {
    id: 'johndoe',
    name: 'John Doe',
    avatar: 'https://avatar.com/johndoe',
    email: 'johndoe@mail.com'
};

const fakeTokenResponse = {
    token: 'afaketoken'
};

const fakeErrorResponse = new Error('Internal server error');

describe('asyncSetAuthUser thunk', () => {
    beforeEach(() => {
        api._getOwnProfile = api.getOwnProfile;
        api._login = api.login;
    });

    afterEach(() => {
        api.getOwnProfile = api._getOwnProfile;
        api.login = api._login;

        delete api._getOwnProfile;
        delete api._login;
    });

    it('should dispatch action correctly when data fetching sucess', async () => {
        // arrange
        // stub implementation
        api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
        api.login = () => Promise.resolve(fakeTokenResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncSetAuthUser({
            email: fakeAuthUserResponse.email,
            password: 'mypassword'
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
        api.login = () => Promise.resolve(fakeTokenResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncSetAuthUser({
            email: fakeAuthUserResponse.email,
            password: 'mypassword'
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});

describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch action correctly', () => {
        // arrange
        // mock dispatch
        const dispatch = vi.fn();

        // action
        asyncUnsetAuthUser()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    });
});