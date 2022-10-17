import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/post", params);
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const { data } = await axios.delete(`/post/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (params) => {
    try {
      console.log(params)
      const { data } = await axios.put(`/post/${params.id}`, params);
    console.log(data)
     
      return data;
     
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/post");

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.posts._id
      );
    },
    [deletePost.rejected]: (state) => {
      state.loading = false;
    },
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;

      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
     
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
