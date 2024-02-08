import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import isPreloadReducer from './isPreload/reducer';

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        threads: threadsReducer,
        isPreload: isPreloadReducer
    }
});

export default store;