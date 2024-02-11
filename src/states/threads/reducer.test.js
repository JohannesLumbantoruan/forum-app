/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given unknown action
 *  - should return the threads when given RECEIVE_THREADS action
 *  - should return the threads with added thread when given ADD_THREAD action
 *  - should return the threads with upvote thread when given UPVOTE_THREAD action
 *  - should return the threads with downvote thread when given DOWNVOTE_THREAD action
 *  - should return the threads with netral vote thread when given NEUTRALIZE_VOTE_THREAD action
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
    it('should return the initial state when given unknown action', () => {
        // arrange
        const initialState = [];
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the threads when given RECEIVE_THREADS action', () => {
        // arrange
        const initialState = [];
        const threads = [
            {
                id: 'thread-Np47p4jhUXYhrhRn',
                title: 'Bagaimana pengalamanmu belajar Redux?',
                body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                category: 'redux',
                createdAt: '2023-05-29T07:55:52.266Z',
                ownerId: 'user-mQhLzINW_w5TxxYf',
                totalComments: 0,
                upVotesBy: [],
                downVotesBy: []
            },
            {
                id: 'thread-91KocEqYPRz68MhD',
                title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
                body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
                category: 'perkenalan',
                createdAt: '2023-05-29T07:54:35.746Z',
                ownerId: 'user-aROWej8yYA1sOfHN',
                totalComments: 1,
                upVotesBy: [
                    'user-mQhLzINW_w5TxxYf'
                ],
                downVotesBy: []
            }
        ];
        const action = {
            type: 'RECEIVE_THREADS',
            payload: {
                threads
            }
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(threads);
    });

    it('should return the threads with added thread when given ADD_THREAD action', () => {
        // arrange
        const initialState = [];
        const thread = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            category: 'redux',
            createdAt: '2023-05-29T07:55:52.266Z',
            ownerId: 'user-mQhLzINW_w5TxxYf',
            totalComments: 0,
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'ADD_THREAD',
            payload: {
                thread
            }
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([thread]);
    });

    it('should return the threads with upvote thread when given UPVOTE_THREAD action', () => {
        // arrange
        const initialState = [
            {
                id: 'thread-Np47p4jhUXYhrhRn',
                title: 'Bagaimana pengalamanmu belajar Redux?',
                body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                category: 'redux',
                createdAt: '2023-05-29T07:55:52.266Z',
                ownerId: 'user-mQhLzINW_w5TxxYf',
                totalComments: 0,
                upVotesBy: [],
                downVotesBy: []
            }
        ];
        const action = {
            type: 'UPVOTE_THREAD',
            payload: {
                threadId: 'thread-Np47p4jhUXYhrhRn',
                userId: 'user-12345'
            }
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([
            {
                ...initialState[0],
                upVotesBy: ['user-12345']
            }
        ]);
    });

    it('should return the threads with downvote thread when given DOWNVOTE_THREAD action', () => {
        // arrange
        const initialState = [
            {
                id: 'thread-Np47p4jhUXYhrhRn',
                title: 'Bagaimana pengalamanmu belajar Redux?',
                body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                category: 'redux',
                createdAt: '2023-05-29T07:55:52.266Z',
                ownerId: 'user-mQhLzINW_w5TxxYf',
                totalComments: 0,
                upVotesBy: [],
                downVotesBy: []
            }
        ];
        const action = {
            type: 'DOWNVOTE_THREAD',
            payload: {
                threadId: 'thread-Np47p4jhUXYhrhRn',
                userId: 'user-12345'
            }
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([
            {
                ...initialState[0],
                downVotesBy: ['user-12345']
            }
        ]);
    });

    it('should return the threads with netral vote thread when given NEUTRALIZE_VOTE_THREAD action', () => {
        // arrange: thread upvote by user
        const initialState = [
            {
                id: 'thread-Np47p4jhUXYhrhRn',
                title: 'Bagaimana pengalamanmu belajar Redux?',
                body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                category: 'redux',
                createdAt: '2023-05-29T07:55:52.266Z',
                ownerId: 'user-mQhLzINW_w5TxxYf',
                totalComments: 0,
                upVotesBy: ['user-12345'],
                downVotesBy: ['user-23456']
            }
        ];
        const action = {
            type: 'NEUTRALIZE_VOTE_THREAD',
            payload: {
                threadId: 'thread-Np47p4jhUXYhrhRn',
                userId: 'user-12345'
            }
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([
            {
                ...initialState[0],
                upVotesBy: []
            }
        ]);

        // arrange: : thread downvote by user
        const action2 = {
            type: 'NEUTRALIZE_VOTE_THREAD',
            payload: {
                threadId: 'thread-Np47p4jhUXYhrhRn',
                userId: 'user-23456'
            }
        };

        // action
        const nextState2 = threadsReducer(nextState, action2);

        // assert
        expect(nextState2).toEqual([
            {
                ...nextState[0],
                downVotesBy: []
            }
        ]);
    });
});