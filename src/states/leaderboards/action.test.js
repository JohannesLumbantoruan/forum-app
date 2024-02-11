/**
 * test scenario for thunk
 *
 * - asyncReceiveLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
    afterEach, beforeEach, describe, expect, it, vi
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';
import { asyncReceiveLeaderboard, receiveleaderboardsActionCreator } from './action';

const fakeLeaderboardsResponse = [
    {
        user: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            email: 'dimas@dicoding.com',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
        },
        score: 25
    },
    {
        user: {
            id: 'user-aROWej8yYA1sOfHN',
            name: 'Dicoding',
            email: 'admin@dicoding.com',
            avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-3SipNdFkSbUWm02x',
            name: 'Ebayyou Anggoro',
            email: 'ebayyouggee@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=Ebayyou Anggoro&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-qNlzdBwJg6Y5lvMh',
            name: 'lya',
            email: 'lyara@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=lya&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-Xvs37VRKXlwiQboW',
            name: 'rizky d',
            email: 'rizky.darmarazak@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=rizky d&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-a1-HAtnwzfDP6hrw',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John Doe&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-M2S7jj4f5v4TdceX',
            name: 'ega',
            email: 'ega@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=ega&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-9QgFBJP0NDTo1kka',
            name: 'elfin',
            email: 'elfin@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=elfin&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-46_FqElsvgCSqhzz',
            name: 'zzz',
            email: 'coba18@mail.com',
            avatar: 'https://ui-avatars.com/api/?name=zzz&background=random'
        },
        score: 0
    },
    {
        user: {
            id: 'user-lUlbU1O0hcUmsKZc',
            name: 'rahmat',
            email: 'rahmathidayatullah996@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=rahmat&background=random'
        },
        score: 0
    }
];

const fakeErrorResponse = new Error('Internal server error');

describe('asyncReceiveLeaderboards thunk', () => {
    beforeEach(() => {
        api._getLeaderboards = api.getLeaderboards;
    });

    afterEach(() => {
        api.getLeaderboards = api._getLeaderboards;

        delete api._getLeaderboards;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncReceiveLeaderboard()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveleaderboardsActionCreator(fakeLeaderboardsResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncReceiveLeaderboard()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});