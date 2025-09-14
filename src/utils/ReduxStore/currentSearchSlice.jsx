import { createSlice } from "@reduxjs/toolkit";

const currentSearchSlice = createSlice({
    name: "currentSearch",
    initialState: {
        update: {},
        updatePage: 1,
        rangeSearch: {},
        rangeSearchPage: 1,
        recentAdded: {},
        recentAddedPage: 1,
    },
    reducers: {
        addUpdate: (state, action) => {
            const { page, data } = action.payload;
            state.update[page] = data;
        },
        incrementUpdatePage: (state) => {
            state.updatePage += 1;
        },
        decrementUpdatePage: (state) => {
            if (state.updatePage > 1) state.updatePage -= 1;
        },
        resetUpdate: (state) => {
            state.update = {};
            state.updatePage = 1;
        },

        addRangeSearch: (state, action) => {
            const { page, data } = action.payload;
            state.rangeSearch[page] = data;
        },
        incrementRangeSearchPage: (state) => {
            state.rangeSearchPage += 1;
        },
        decrementRangeSearchPage: (state) => {
            if (state.rangeSearchPage > 1) state.rangeSearchPage -= 1;
        },
        resetRangeSearch: (state) => {
            state.rangeSearch = {};
            state.rangeSearchPage = 1;
        },

        addRecentAdded: (state, action) => {
            const { page, data } = action.payload;
            state.recentAdded[page] = data;
        },
        incrementRecentAddedPage: (state) => {
            state.recentAddedPage += 1;
        },
        decrementRecentAddedPage: (state) => {
            if (state.recentAddedPage > 1) state.recentAddedPage -= 1;
        },
        resetRecentAdded: (state) => {
            state.recentAdded = {};
            state.recentAddedPage = 1;
        },
    },
});

export const {
    addUpdate,
    incrementUpdatePage,
    decrementUpdatePage,
    resetUpdate,

    addRangeSearch,
    incrementRangeSearchPage,
    decrementRangeSearchPage,
    resetRangeSearch,

    addRecentAdded,
    incrementRecentAddedPage,
    decrementRecentAddedPage,
    resetRecentAdded,
} = currentSearchSlice.actions;

export default currentSearchSlice.reducer;
