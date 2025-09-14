import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userId: '',
    firstName: '',
    lastName: '',
    emailId: '',
    income: '',
    expense: '',
    isLoaded: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState ,
    reducers: {
        setUserId: (state , action) => { state.userId = action.payload; },
        setFirstName: (state, action) => { state.firstName = action.payload; },
        setLastName: (state, action) => { state.lastName = action.payload; },
        setEmailId: (state, action) => { state.emailId = action.payload; },
        setIncome: (state, action) => { state.income = action.payload; },
        setExpense: (state, action) => { state.expense = action.payload; },
        setProfileLoaded: (state, action) => { state.isLoaded = action.payload } ,
        resetProfile: () => initialState,
    }
});

export const {
    setUserId,
    setFirstName,
    setLastName,
    setEmailId,
    setExpense,
    setIncome,
    setProfileLoaded,
    resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;