import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 API se blogs fetch karna
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (authorId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/blogs/getblog/${authorId}`);
        return response.data.newPerson?.createdBlogs || [];
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch blogs";
    }
});

const blogsSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default blogsSlice.reducer;
