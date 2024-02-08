import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import authCheck from './middlewares/authCheck';

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        threads: threadsReducer,
        isPreload: isPreloadReducer,
        threadDetail: threadDetailReducer,
        users: usersReducer,
        leaderboards: leaderboardsReducer
    },
    middleware: (getDefaultMiddleware) => [authCheck, ...getDefaultMiddleware()]
});

export default store;