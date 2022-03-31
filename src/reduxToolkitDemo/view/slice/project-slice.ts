/*
 * @Author: 王荣
 * @Date: 2022-02-24 22:37:21
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-31 22:02:09
 * @Description: 填写简介
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProjectState {
  projectModalOpen: boolean;
  count: number;
  testList: any[];
}

const initialState: IProjectState = {
  projectModalOpen: false,
  count: 0,
  testList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

//使用createSlice方法创建一个slice（其实就是reducer）。每一个slice里面包含了reducer和actions，可以实现模块化的封装。所有的相关操作都独立在一个文件中完成。
export const projectSlice = createSlice({
  name: "projectSlice", // 命名空间，在调用action的时候会默认的设置为action的前缀 自动的把每一个action进行独立，解决了action的type出现同名的文件。在使用的时候默认会使用name/actionName
  initialState, //该切片维护的状态
  reducers: {
    //定义action。由于内置了immutable插件immer，可以直接使用赋值的方式进行数据的改变，不需要每一次都返回一个新的state数据。
    openProjectModal(state, action: PayloadAction<boolean>) {
      // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
      state.projectModalOpen = true;
    },
    closeProjectModal(state, action: PayloadAction<boolean>) {
      // action属性推导定义为{payload:any, type: string}
      state.projectModalOpen = false;
    },
    increment(state, action: PayloadAction<{ step: number }>) {
      // console.log(action);
      state.count = state.count + action.payload.step; // 内置了immutable
      const deleteIndex = state.testList.findIndex((item) => {
        return item === 5;
      });
      state.testList.splice(deleteIndex, 1);
    },
  },
  // 这里类比之前原始的rducers 但是不是之前的纯函数 传入actions 比较action.type 返回新的State； toolkit提供更加直观的方式 会通过immer.js(不可变数据)这个库转化为原reducer的写法
});

export const projectActions = projectSlice.actions; //和原reducer的action概念是一样的 但它的类型已经变成上面reducer里的一个个的方法 导出action

export default projectSlice.reducer; // 默认导出reducer 在store中组合成总的reducer

// 内置了thunk插件，可以直接处理thunk函数
export const asyncChange = (payload) => (dispatch, getState) => {
  console.log("beforestate", getState());
  dispatch(projectActions.increment(payload)); // dispatch(increment({ step: 2 })); // dispatch派发action
  console.log("state", getState());
  return Promise.resolve(getState().Project.count);
};

// Later, dispatch the thunk as needed in the app
// dispatch(asyncChange(123))

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
