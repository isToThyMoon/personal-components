/*
 * @Author: 王荣
 * @Date: 2022-02-24 22:37:21
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-31 21:22:08
 * @Description: 填写简介
 */

import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";

interface IAuthState {
  user: {} | null;
}

const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "projectSlice",
  initialState, //该切片维护的状态
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  // 这里类比之前原始的rducers 但是不是之前的纯函数 传入actions 比较action.type 返回新的State； toolkit提供更加直观的方式 会通过immer.js(不可变数据)这个库转化为原reducer的写法
});

const { setUser } = authSlice.actions; //和原reducer的action概念是一样的 但它的类型已经变成上面reducer里的一个个的方法

export const login = () => {
  // 使用时依然是传入react-redux提供的dispatch方法 redux-thunk使它可以接受一个函数函数并执行， 执行异步函数内的异步逻辑 和原redux写法一样了。
  return (dispatch: AppDispatch) => {
    return new Promise((resolve, reject) => {
      // 模拟异步请求
    }).then((user) => {
      dispatch(setUser(user));
    });
  };
};

// import produce from "@reduxjs/toolkit/node_modules/immer";

// const baseState = [
//     {
//         todo: 'learn ts',
//         done: true
//     },
//     {
//         todo: 'try immer',
//         done: false
//     },
// ]

// const nextState = produce(baseState, draftState => {
//     draftState.push({ todo: 'Tweet about it', done: false})
//     draftState[1].done = true
// })
