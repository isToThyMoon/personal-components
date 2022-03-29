/*
 * @Author: 王荣
 * @Date: 2022-02-24 22:54:18
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-29 21:54:03
 * @Description: 填写简介
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { projectActions, asyncChange } from "./project.slice";

export const Project = () => {
  console.log("重载");
  const dispatch = useDispatch<AppDispatch>(); // 不需要再通过高阶组件connect的方法来连接redux的store和组件的属性（props） 直接使用hook引入
  const { projectModalOpen, count } = useSelector(
    (state: RootState) => state.Project
  ); //读总状态树里的状态 是总的状态树，这也是为什么selectProjectModalOpen要做一个函数返回
  console.log("重载", count);

  useEffect(() => {
    console.log("effectcount", count);
  }, [count]);

  console.log("代码结束");
  return (
    // <Provider store={store}>
    <div>
      <div>{String(projectModalOpen)}</div>
      <div>{String(count)}</div>
      <button
        onClick={() => {
          console.log("修改redux");
          dispatch(projectActions.openProjectModal(true));
        }}
      >
        修改redux的store内容 开
      </button>

      <button
        onClick={() => {
          console.log("修改redux");
          dispatch(projectActions.closeProjectModal(false));
        }}
      >
        修改redux的store内容 关
      </button>

      <button
        onClick={() => {
          console.log("修改redux");
          dispatch(asyncChange({ step: 3 })).then((count) => {
            console.log("count promise", count);
          });
        }}
      >
        异步内容
      </button>
    </div>
    // </Provider>
  );
};
