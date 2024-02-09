import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        threads: threadsReducer,
        isPreload: isPreloadReducer,
        threadDetail: threadDetailReducer,
        users: usersReducer,
        leaderboards: leaderboardsReducer,
        loadingBar: loadingBarReducer
    }
});

export default store;