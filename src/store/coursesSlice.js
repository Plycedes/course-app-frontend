import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
    //const response = await fetch("http://localhost:5000/courses");
    const response = await fetch("https://course-app-backend-8bbj.onrender.com/courses");
    return await response.json();
});

const coursesSlice = createSlice({
    name: "courses",
    initialState: {
        list: [],
    },
    reducers: {
        likeCourse: (state, action) => {
            const course = state.list.find((c) => c.id === action.payload);
            if (course) course.likes += 1;
        },
        completeCourse: (state, action) => {
            const course = state.list.find((c) => c.id === action.payload);
            if (course) {
                course.completed = !course.completed;
            }
        },
        updateLikes: (state, action) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export const { likeCourse, completeCourse, updateLikes } = coursesSlice.actions;
export default coursesSlice.reducer;
