import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import categoriesReducer from './categories/reducer';
import filteredThreadsReducer from './filteredThreads/reducer';

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        threads: threadsReducer,
        isPreload: isPreloadReducer,
        threadDetail: threadDetailReducer,
        users: usersReducer,
        leaderboards: leaderboardsReducer,
        loadingBar: loadingBarReducer,
        categories: categoriesReducer,
        filteredThreads: filteredThreadsReducer
    }
});

export default store;