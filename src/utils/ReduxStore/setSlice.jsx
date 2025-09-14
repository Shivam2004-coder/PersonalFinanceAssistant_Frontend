import {createSlice} from "@reduxjs/toolkit";

const setSlice = createSlice({
    name:"Set",
    initialState: {
        imageUrl : "/Usericon.jpg",

        showMenu : false,
    },
    reducers: {
        addImageUrl:(state ,action) => {
            state.imageUrl = action.payload;
        },
        toggleMenu: (state , action ) => {
            state.showProfileMenu = false;
            state.showSettingsMenu = false;
            state.showMenu = action.payload;
        }
    },
});

export const { 
    addImageUrl,
    toggleMenu,
} = setSlice.actions;

export default setSlice.reducer;