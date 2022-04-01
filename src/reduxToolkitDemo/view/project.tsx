/*
 * @Author: 王荣
 * @Date: 2022-02-24 22:54:18
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-01 11:36:01
 * @Description: 填写简介
 */

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { projectActions, asyncChange } from "./slice/project-slice";

export const Project = () => {
  console.log("重载");
  const dispatch = useDispatch<AppDispatch>(); // 不需要再通过高阶组件connect的方法来连接redux的store和组件的属性（props） 直接使用hook引入
  const { projectModalOpen, count } = useSelector(
    (state: RootState) => state.Project
  ); //读总状态树里的状态 是总的状态树，这也是为什么selectProjectModalOpen要做一个函数返回
  console.log("重载", count);
  function test() {
    console.log("test里重载", count);
  }
  test();

  useEffect(() => {
    console.log("effectcount", count);
  }, [count]);

  useEffect(() => {
    console.log("每次都执行", count);
  });

  const measuredRef = useCallback(
    (node) => {
      if (node !== null) {
        console.log(count);
        window.performance.mark("node getBoundingClientReat start");
        console.log("width", node.getBoundingClientRect().width);
        window.performance.measure(
          "node getBoundingClientReat end",
          "node getBoundingClientReat start"
        );
      }
    },
    [count]
  );

  console.log("代码结束");
  return (
    // <Provider store={store}>
    <div>
      <div>{String(projectModalOpen)}</div>
      <div>
        <span ref={measuredRef}>{String(count)}</span>
      </div>
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
          dispatch(asyncChange({ step: 3 })).then((reduxcount) => {
            console.log("count promise", reduxcount);
            console.log("count", count);
            // 这里的count拿到的不是更新后的3 而是上一次的状态0
            // 原因其实在 react 的官方文档里面有提到
            // 组件内部的任何函数，包括事件处理函数和 effect，都是从它被创建的那次渲染中被「看到」的。
            // 因为这里取count值其实是一个闭包，从这么闭包查找就是那次渲染的值。
            // 也就是组件内部的函数拿到的总是定义它的那次渲染中的props和state
          });
        }}
      >
        异步内容
      </button>
    </div>
    // </Provider>
  );
};
