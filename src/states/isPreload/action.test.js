/**
 * test scenario for thunk
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

import {
    afterEach, beforeEach, describe, it, vi, expect
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthUserResponse = {
    id: 'johndoe',
    name: 'John Doe',
    avatar: 'https://avatar.com/johndoe',
    email: 'johndoe@mail.com'
};

const fakeErrorResponse = new Error('Internal server error');

describe('asyncPreloadProcess thunk', () => {
    beforeEach(() => {
        api._getOwnProfile = api.getOwnProfile;
    });

    afterEach(() => {
        api.getOwnProfile = api._getOwnProfile;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncPreloadProcess()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
        expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncPreloadProcess()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});