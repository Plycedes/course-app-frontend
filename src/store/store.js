import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./coursesSlice";
import studentReducer from "./studentSlice";

export const store = configureStore({
    reducer: {
        courses: coursesReducer,
        student: studentReducer,
    },
});
