/*
 * @Author: 王荣
 * @Date: 2022-02-25 10:40:00
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-25 13:55:15
 * @Description: 填写简介
 */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// createAsyncThunk创建一个异步的action，这个方法被触发的时候会有三个状态
// pending(进行中) fulfilled(成功) rejected(失败)

interface IUserState {
  entities: any[];
  loading: string;
}

const initialState: IUserState = {
  entities: [],
  loading: "idle",
};

// 发起网络请求获取数据
const loadMoviesAPI = (userId) => {
  return fetch(
    "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48" +
      userId
  ).then((res) => res.json());
};

// First, create the thunk
// 这个action是可以直接调用的，用来处理异步操作获取数据
const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId) => {
    const response = await loadMoviesAPI(userId);
    return response; // 此处的返回结果会在 .fulfilled中作为payload的值
  }
);

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.entities.push(action.payload);
      }
    );
  },
  // extraReducers 两种类型两种写法
  // extraReducers: {
  //     [fetchPosts.pending]: (state, action) => {
  //         state.status = 'loading'
  //     },
  //     [fetchPosts.fulfilled]: (state, action) => {
  //         state.status = 'succeeded'
  //         // Add any fetched posts to the array
  //         state.posts = state.posts.concat(action.payload)
  //     },
  //     [fetchPosts.rejected]: (state, action) => {
  //         state.status = 'failed'
  //         state.error = action.error.message
  //     }
  // }
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
