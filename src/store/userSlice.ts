import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    credentials: { username: string; password: string } | null;
    onboardingStep: number;
}

const initialState: UserState = {
    isLoggedIn: false,
    credentials: null,
    onboardingStep: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; password: string }>) => {
            state.isLoggedIn = true;
            state.credentials = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.credentials = null;
            state.onboardingStep = 0;
        },
        setOnboardingStep: (state, action: PayloadAction<number>) => {
            state.onboardingStep = action.payload;
        },
    },
});

export const { login, logout, setOnboardingStep } = userSlice.actions;
export default userSlice.reducer;