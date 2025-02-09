import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginStudent = createAsyncThunk(
    "student/loginStudent",
    async ({ username, password }) => {
        //const response = await fetch(`http://localhost:5000/students/${username}`);
        const response = await fetch(`http://34.132.67.217:5000/students/${username}`);
        const student = await response.json();
        if (student && student.password === password) {
            return student;
        } else {
            throw new Error("Invalid username or password");
        }
    }
);

const studentSlice = createSlice({
    name: "student",
    initialState: {
        currentStudent: null,
        error: null,
    },
    reducers: {
        logoutStudent: (state) => {
            state.currentStudent = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginStudent.fulfilled, (state, action) => {
                state.currentStudent = action.payload;
                state.error = null;
            })
            .addCase(loginStudent.rejected, (state) => {
                state.error = "Invalid username or password.";
            });
    },
});

export const { logoutStudent } = studentSlice.actions;
export default studentSlice.reducer;
