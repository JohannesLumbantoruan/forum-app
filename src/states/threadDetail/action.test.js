/**
 * test scenario for thunk
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncAddComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUpvoteComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncDownvoteComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncNeutralizeVoteComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUpvoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyndDownVoteThread thunk
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
    addCommentActionCreator, asyncAddComment, asyncDownvoteComment, asyncNeutralizeVoteComment, asyncReceiveThreadDetail, asyncUpvoteComment, clearThreadDetailActionCreator, downvoteCommentActionCreator, neutralizeVoteCommentActionCreator, receiveThreadDetailActionCreator, upvoteCommentActionCreator
} from './action';

const fakeErrorResponse = new Error('Internal server error');

describe('asyncReceiveThreadDetail thunk', () => {
    const fakeThreadDetailResponse = {
        id: 'thread-91KocEqYPRz68MhD',
        title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
        body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
        createdAt: '2023-05-29T07:54:35.746Z',
        owner: {
            id: 'user-aROWej8yYA1sOfHN',
            name: 'Dicoding',
            avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random'
        },
        category: 'perkenalan',
        comments: [
            {
                id: 'comment-XhqYiuyhZm1mWHqn',
                content: 'Halo!<br>Perkanalkan, nama saya Dimas.',
                createdAt: '2023-05-29T07:59:04.689Z',
                owner: {
                    id: 'user-mQhLzINW_w5TxxYf',
                    name: 'Dimas Saputra',
                    avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
                },
                upVotesBy: [
                    'user-Yx7puhYhhv2ZZ5_4'
                ],
                downVotesBy: []
            }
        ],
        upVotesBy: [
            'user-mQhLzINW_w5TxxYf'
        ],
        downVotesBy: []
    };

    beforeEach(() => {
        api._getThreadDetail = api.getThreadDetail;
    });

    afterEach(() => {
        api.getThreadDetail = api._getThreadDetail;

        delete api._getThreadDetail;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.getThreadDetail = () => Promise.resolve(fakeThreadDetailResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncReceiveThreadDetail('thread-91KocEqYPRz68MhD')(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
        expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetailResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncReceiveThreadDetail('thread-91KocEqYPRz68MhD')(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});

describe('asyncAddComment thunk', () => {
    const fakeAddCommentResponse = {
        id: 'comment-A5mPQTMSpN0qma8-',
        content: 'Saya suka sekali redux',
        createdAt: '2024-02-11T05:01:06.750Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
            id: 'user-Yx7puhYhhv2ZZ5_4',
            name: 'John Doe',
            email: 'johndoe@mail.com',
            avatar: 'https://ui-avatars.com/api/?name=John Doe&background=random'
        }
    };

    beforeEach(() => {
        api._createThreadComment = api.createThreadComment;
    });

    afterEach(() => {
        api.createThreadComment = api._createThreadComment;

        delete api._createThreadComment;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.createThreadComment = () => Promise.resolve(fakeAddCommentResponse);
        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncAddComment({
            id: 'thread-12345',
            content: 'Saya suka sekali redux'
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeAddCommentResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.createThreadComment = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncAddComment({
            id: 'thread-12345',
            content: 'Saya suka sekali redux'
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});

describe('asyncUpvoteComment thunk', () => {
    const fakeUpvoteCommentResponse = { status: 'success' };

    beforeEach(() => {
        api._upvoteComment = api.upvoteComment;
    });

    afterEach(() => {
        api.upvoteComment = api._upvoteComment;

        delete api._upvoteComment;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.upvoteComment = () => Promise.resolve(fakeUpvoteCommentResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        downVotesBy: []
                    }
                ]
            }
        }));

        // action
        await asyncUpvoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(upvoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(getState).toBeCalledTimes(2);
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.upvoteComment = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        downVotesBy: []
                    }
                ]
            }
        }));
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncUpvoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
        expect(getState).toBeCalledTimes(2);
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

        // arrange: comment downvote by user
        // mock getState
        const getState2 = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        downVotesBy: ['user-12345']
                    }
                ]
            }
        }));

        // action
        await asyncUpvoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState2);

        // assert
        expect(dispatch).toHaveBeenCalledWith(downvoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
    });
});

describe('asyncDownvoteComment thunk', () => {
    const fakeDownvoteCommentResponse = { status: 'success' };

    beforeEach(() => {
        api._downvoteComment = api.downvoteComment;
    });

    afterEach(() => {
        api.downvoteComment = api._downvoteComment;

        delete api._downvoteComment;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.downvoteComment = () => Promise.resolve(fakeDownvoteCommentResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        upVotesBy: []
                    }
                ]
            }
        }));

        // action
        await asyncDownvoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(downvoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(getState).toBeCalledTimes(2);
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.downvoteComment = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        upVotesBy: []
                    }
                ]
            }
        }));
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncDownvoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
        expect(getState).toBeCalledTimes(2);
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

        // arrange: comment upvote by user
        // mock getState
        const getState2 = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        upVotesBy: ['user-12345']
                    }
                ]
            }
        }));

        // action
        await asyncDownvoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState2);

        // assert
        expect(dispatch).toHaveBeenCalledWith(upvoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
    });
});

describe('asyncNeutralizeVoteComment thunk', () => {
    const fakeNeutralizeVoteCommentResponse = { status: 'success' };

    beforeEach(() => {
        api._neutralizeComment = api.neutralizeComment;
    });

    afterEach(() => {
        api.neutralizeComment = api._neutralizeComment;

        delete api._neutralizeComment;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.neutralizeComment = () => Promise.resolve(fakeNeutralizeVoteCommentResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        upVotesBy: ['user-12345'],
                        downVotesBy: ['user-23456']
                    }
                ]
            }
        }));

        // action
        await asyncNeutralizeVoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(getState).toBeCalledTimes(1);
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange: comment upvote by user
        // stub implementation
        api.neutralizeComment = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        // mock getState
        const getState = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        upVotesBy: ['user-12345'],
                        downVotesBy: []
                    }
                ]
            }
        }));
        // mock alert
        window.alert = vi.fn();

        // action
        await asyncNeutralizeVoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
        expect(dispatch).toHaveBeenCalledWith(upvoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
        expect(getState).toBeCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

        // arrange: comment downvote by user
        // mock getState
        const getState2 = vi.fn().mockImplementation(() => ({
            authUser: {
                id: 'user-12345'
            },
            threadDetail: {
                comments: [
                    {
                        id: 'comment-12345',
                        downVotesBy: ['user-12345'],
                        upVotesBy: []
                    }
                ]
            }
        }));

        // action
        await asyncNeutralizeVoteComment({ threadId: 'thread-12345', commentId: 'comment-12345' })(dispatch, getState2);

        // assert
        expect(dispatch).toHaveBeenCalledWith(downvoteCommentActionCreator({
            commentId: 'comment-12345',
            userId: 'user-12345'
        }));
    });
});