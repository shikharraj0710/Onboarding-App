/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const loadState = () => {
    const state = localStorage.getItem('reduxState');
    return state ? JSON.parse(state) : undefined;
};

const saveState = (state: any) => {
    localStorage.setItem('reduxState', JSON.stringify(state));
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
