/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given unknown action
 *  - should return the leaderboards when given RECEIVE_LEADERBOARDS action
 */

import { describe, expect, it } from 'vitest';
import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
    const initialState = [];

    it('should return the initial state when given unknown action', () => {
        // arrange
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = leaderboardsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the leaderboards when given RECEIVE_LEADERBOARDS action', () => {
        // arrange
        const leaderboards = [
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

        const action = {
            type: 'RECEIVE_LEADERBOARDS',
            payload: {
                leaderboards
            }
        };

        // action
        const nextState = leaderboardsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(leaderboards);
    });
});