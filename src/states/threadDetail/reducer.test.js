/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given unknown action
 *  - should return the threadDetail when given RECEIVE_THREAD_DETAIL action
 *  - should return null when given CLEAR_THREAD_DETAIL action
 *  - should return threadDetail with comment added when given ADD_COMMENT action
 *  - should return threadDetail with comment upvote added when given UPVOTE_COMMENT action
 *  - should return threadDetail with comment downvote added when given DOWNVOTE_COMMENT action
 *  - should return threadDetail with comment netral vote when given NEUTRALIZE_VOTE_COMMENT action
 *  - should return threadDetail with upvote added when given UPVOTE_DETAIL_THREAD action
 *  - should return threadDetail with downvote added when given DOWNVOTE_DETAIL_THREAD action
 *  - should return threadDetail with netral vote when given NEUTRALIZE_DETAIL_THREAD action
 */

import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
    it('should return the initial state when given unknown action', () => {
        // arrange
        const initialState = null;
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the threadDetail when given RECEIVE_THREAD_DETAIL action', () => {
        // arrange
        const initialState = null;
        const threadDetail = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
            comments: [],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'RECEIVE_THREAD_DETAIL',
            payload: {
                threadDetail
            }
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(threadDetail);
    });

    it('should return null when given CLEAR_THREAD_DETAIL action', () => {
        // arrange
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
            comments: [],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'CLEAR_THREAD_DETAIL'
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(null);
    });

    it('should return threadDetail with comment added when given ADD_COMMENT action', () => {
        // arrange
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
            comments: [],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'ADD_COMMENT',
            payload: {
                comment: {
                    id: 'comment-12345',
                    content: 'Saya suka redux'
                }
            }
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            ...initialState,
            comments: [action.payload.comment]
        });
    });

    it('should return threadDetail with comment upvote added when given UPVOTE_COMMENT action', () => {
        // arrange
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
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
                    upVotesBy: [],
                    downVotesBy: []
                }
            ],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'UPVOTE_COMMENT',
            payload: {
                commentId: 'comment-XhqYiuyhZm1mWHqn',
                userId: 'user-12345'
            }
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            ...initialState,
            comments: [
                {
                    ...initialState.comments[0],
                    upVotesBy: [action.payload.userId]
                }
            ]
        });
    });

    it('should return threadDetail with comment downvote added when given DOWNVOTE_COMMENT action', () => {
        // arrange
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
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
                    upVotesBy: [],
                    downVotesBy: []
                }
            ],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'DOWNVOTE_COMMENT',
            payload: {
                commentId: 'comment-XhqYiuyhZm1mWHqn',
                userId: 'user-12345'
            }
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            ...initialState,
            comments: [
                {
                    ...initialState.comments[0],
                    downVotesBy: [action.payload.userId]
                }
            ]
        });
    });

    it('should return threadDetail with comment netral vote when given NEUTRALIZE_VOTE_COMMENT action', () => {
        // arrange: neutralize upvote
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
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
                    upVotesBy: ['user-12345'],
                    downVotesBy: ['user-23456']
                }
            ],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'NEUTRALIZE_VOTE_COMMENT',
            payload: {
                commentId: 'comment-XhqYiuyhZm1mWHqn',
                userId: 'user-12345'
            }
        };

        // action: neutralize upvote
        const nextState = threadDetailReducer(initialState, action);

        // assert: neutralize upvote
        expect(nextState).toEqual({
            ...initialState,
            comments: [
                {
                    ...initialState.comments[0],
                    upVotesBy: []
                }
            ]
        });

        // arrange: neutralize downvote
        const action2 = {
            type: 'NEUTRALIZE_VOTE_COMMENT',
            payload: {
                commentId: 'comment-XhqYiuyhZm1mWHqn',
                userId: 'user-23456'
            }
        };

        // action: neutralize downvote
        const nextState2 = threadDetailReducer(nextState, action2);

        // assert: neutralize downvote
        expect(nextState2).toEqual({
            ...nextState,
            comments: [
                {
                    ...nextState.comments[0],
                    downVotesBy: []
                }
            ]
        });
    });

    it('should return threadDetail with upvote added when given UPVOTE_DETAIL_THREAD action', () => {
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
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
                    upVotesBy: [],
                    downVotesBy: []
                }
            ],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'UPVOTE_DETAIL_THREAD',
            payload: {
                userId: 'user-12345'
            }
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            ...initialState,
            upVotesBy: [action.payload.userId]
        });
    });

    it('should return threadDetail with downvote added when given DOWNVOTE_DETAIL_THREAD action', () => {
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
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
                    upVotesBy: [],
                    downVotesBy: []
                }
            ],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'DOWNVOTE_DETAIL_THREAD',
            payload: {
                userId: 'user-12345'
            }
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            ...initialState,
            downVotesBy: [action.payload.userId]
        });
    });

    it('should return threadDetail with netral vote when given NEUTRALIZE_DETAIL_THREAD action', () => {
        // arrange: neutralize upvote
        const initialState = {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            createdAt: '2023-05-29T07:55:52.266Z',
            owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
            },
            category: 'redux',
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
                    upVotesBy: ['user-12345'],
                    downVotesBy: ['user-23456']
                }
            ],
            upVotesBy: [],
            downVotesBy: []
        };
        const action = {
            type: 'NEUTRALIZE_DETAIL_THREAD',
            payload: {
                userId: 'user-12345'
            }
        };

        // action: neutralize upvote
        const nextState = threadDetailReducer(initialState, action);

        // assert: neutralize upvote
        expect(nextState).toEqual({
            ...initialState,
            upVotesBy: []
        });

        // arrange: neutralize downvote
        const action2 = {
            type: 'NEUTRALIZE_DETAIL_THREAD',
            payload: {
                userId: 'user-23456'
            }
        };

        // action: neutralize downvote
        const nextState2 = threadDetailReducer(nextState, action2);

        // assert: neutralize downvote
        expect(nextState2).toEqual({
            ...nextState,
            downVotesBy: []
        });
    });
});