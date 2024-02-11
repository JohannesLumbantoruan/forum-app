/**
 * test scenario for threads thunks
 *
 * - asyncReceiveThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUpvoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncDownvoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncNeutralizeVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
    afterEach, beforeEach, describe, expect, it, vi
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';
import {
    addThreadActionCreator, asyncAddThread, asyncDownvoteThread, asyncNeutralizeVoteThread, asyncReceiveThreads, asyncUpvoteThread, downvoteThreadActionCreator, neutralizeVoteActionCreator, receiveThreadsActionCreator, upvoteThreadActionCreator
} from './action';
import { receiveCategoriesActionCreator } from '../categories/action';

const fakeErrorResponse = new Error('Internal server error');

describe('asyncReceiveThreads thunk', () => {
    const fakeReceiveThreadsResponse = [
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

    beforeEach(() => {
        api._getAllThreads = api.getAllThreads;
    });

    afterEach(() => {
        api.getAllThreads = api._getAllThreads;

        delete api._getAllThreads;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.getAllThreads = () => Promise.resolve(fakeReceiveThreadsResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncReceiveThreads()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeReceiveThreadsResponse));
        expect(dispatch).toHaveBeenCalledWith(receiveCategoriesActionCreator(['redux', 'perkenalan']));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getAllThreads = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncReceiveThreads()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});

describe('asyncAddThread thunk', () => {
    const fakeAddThreadResponse = {
        title: 'React',
        category: 'react',
        body: 'React merupakan library UI terbaik'
    };

    beforeEach(() => {
        api._createThread = api.createThread;
    });

    afterEach(() => {
        api.createThread = api._createThread;

        delete api._createThread;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.createThread = () => Promise.resolve(fakeAddThreadResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncAddThread(fakeAddThreadResponse)(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeAddThreadResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.createThread = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncAddThread(fakeAddThreadResponse)(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});

describe('asyncUpvoteThread thunk', () => {
    const fakeUpvoteThreadResponse = { status: 'success' };

    beforeEach(() => {
        api._upvoteThread = api.upvoteThread;
    });

    afterEach(() => {
        api.upvoteThread = api._upvoteThread;

        delete api._upvoteThread;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.upvoteThread = () => Promise.resolve(fakeUpvoteThreadResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
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
            ]
        }));

        // action
        await asyncUpvoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(upvoteThreadActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(getState).toBeCalledTimes(3);
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.upvoteThread = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
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
            ]
        }));

        // action
        await asyncUpvoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(neutralizeVoteActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

        // arrange: thread downvote by user
        // mock getState
        const getState2 = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    upVotesBy: [],
                    downVotesBy: ['user-12345']
                }
            ]
        }));

        // action
        await asyncUpvoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState2);

        // assert
        expect(dispatch).toHaveBeenCalledWith(downvoteThreadActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
    });
});

describe('asyncDownvoteThread thunk', () => {
    const fakeDownvoteThreadResponse = { status: 'success' };

    beforeEach(() => {
        api._downvoteThread = api.downvoteThread;
    });

    afterEach(() => {
        api.downvoteThread = api._downvoteThread;

        delete api._downvoteThread;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.downvoteThread = () => Promise.resolve(fakeDownvoteThreadResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
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
            ]
        }));

        // action
        await asyncDownvoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(downvoteThreadActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(getState).toBeCalledTimes(3);
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.downvoteThread = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
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
            ]
        }));

        // action
        await asyncDownvoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(neutralizeVoteActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

        // arrange: thread upvote by user
        // mock getState
        const getState2 = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    downVotesBy: [],
                    upVotesBy: ['user-12345']
                }
            ]
        }));

        // action
        await asyncDownvoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState2);

        // assert
        expect(dispatch).toHaveBeenCalledWith(upvoteThreadActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
    });
});

describe('asyncNeutralizeVoteThread thunk', () => {
    const fakeNeutralizeVoteThreadResponse = { status: 'success' };

    beforeEach(() => {
        api._neutralizeThread = api.neutralizeThread;
    });

    afterEach(() => {
        api.neutralizeThread = api._neutralizeThread;

        delete api._neutralizeThread;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.neutralizeThread = () => Promise.resolve(fakeNeutralizeVoteThreadResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    upVotesBy: ['user-12345'],
                    downVotesBy: []
                }
            ]
        }));

        // action
        await asyncNeutralizeVoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(neutralizeVoteActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(getState).toBeCalledTimes(2);
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.neutralizeThread = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
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
            ]
        }));

        // action
        await asyncNeutralizeVoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

        // arrange: thread downvote by user
        // mock getState
        const getState2 = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    upVotesBy: [],
                    downVotesBy: ['user-12345']
                }
            ]
        }));

        // action
        await asyncNeutralizeVoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState2);

        // assert
        expect(dispatch).toHaveBeenCalledWith(downvoteThreadActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));

        // arrange: thread upvote by user
        // mock getState
        const getState3 = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    downVotesBy: [],
                    upVotesBy: ['user-12345']
                }
            ]
        }));

        // action
        await asyncNeutralizeVoteThread('thread-Np47p4jhUXYhrhRn')(dispatch, getState3);

        // assert
        expect(dispatch).toHaveBeenCalledWith(upvoteThreadActionCreator({
            userId: 'user-12345',
            threadId: 'thread-Np47p4jhUXYhrhRn'
        }));
    });
});