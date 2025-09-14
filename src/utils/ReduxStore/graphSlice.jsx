import { createSlice } from "@reduxjs/toolkit";


const graphSlice = createSlice({
    name: "graph",
    initialState: {
        expVsDataSearch: null,
        expVsCatSearch: null,  
        recentPDFSearchData: null,
        rangePDFSearchData: null,
    },
    reducers: {
        setExpVsDataSearch: (state, action) => {
            state.expVsDataSearch = action.payload;
        },
        setExpVsCatSearch: (state, action) => {
            state.expVsCatSearch = action.payload;
        },
        setRecentPDFSearchData: (state , action) => {
            state.recentPDFSearchData = action.payload;
        },
        setRangePDFSearchData: (state , action) => {
            state.rangePDFSearchData = action.payload;
        }

    },
});


export const { setExpVsDataSearch , setExpVsCatSearch , setRecentPDFSearchData , setRangePDFSearchData } = graphSlice.actions;
export default graphSlice.reducer;