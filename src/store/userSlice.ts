/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    credentials: { username: string; password: string } | null;
    onboardingStep: number;
    formData: {
        name: string;
        age: string;
        email: string;
        profilePicture?: string | null;
        songs: string[];
        cardNumber: string;
        expiry: string;
        cvv: string;
    };
}

const initialState: UserState = {
    isLoggedIn: false,
    credentials: null,
    onboardingStep: 0,
    formData: {
        name: '',
        age: '',
        email: '',
        profilePicture: null,
        songs: [],
        cardNumber: '',
        expiry: '',
        cvv: '',
    },
};

function isFile(value: any): value is File {
    return value instanceof File;
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; password: string }>) => {
            state.isLoggedIn = true;
            state.credentials = action.payload;
            state.onboardingStep = 0;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.credentials = null;
            state.onboardingStep = 0;
            state.formData = initialState.formData;
            localStorage.clear()
        },
        setOnboardingStep: (state, action: PayloadAction<number>) => {
            state.onboardingStep = action.payload;
        },
        setFormData: (state, action: PayloadAction<Partial<UserState['formData']>>) => {
            const newFormData = { ...state.formData, ...action.payload };

            const { cvv, ...filteredFormData } = newFormData;

            if (isFile(action.payload.profilePicture)) {
                const file = action.payload.profilePicture as File;
                const reader = new FileReader();
                reader.onloadend = () => {
                    newFormData.profilePicture = reader.result as string;
                    state.formData = newFormData;
                    localStorage.setItem('onboardingFormData', JSON.stringify(filteredFormData)); 
                };
                reader.readAsDataURL(file);
            } else {
                state.formData = newFormData;
                localStorage.setItem('onboardingFormData', JSON.stringify(filteredFormData));
            }
        },
        loadFormDataFromLocalStorage: (state) => {
            const savedFormData = localStorage.getItem('onboardingFormData');
            if (savedFormData) {
                const parsedData = JSON.parse(savedFormData);
                state.formData = parsedData;
            }
        },
    },
});

export const { login, logout, setOnboardingStep, setFormData, loadFormDataFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;
