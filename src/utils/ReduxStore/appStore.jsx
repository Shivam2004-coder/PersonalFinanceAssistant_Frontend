import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import setReducer from "./setSlice";
import currentSearchReducer from "./currentSearchSlice";
import graphReducer from "./graphSlice";

const appStore = configureStore({
    reducer: {
        profile: profileReducer,
        set: setReducer,
        currentSearch: currentSearchReducer,
        graph: graphReducer,
    },
});

export default appStore;