/*
 * @Author: 王荣
 * @Date: 2022-03-31 23:20:01
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-31 23:20:01
 * @Description: 填写简介
 */

import { useEffect } from "react";
import useLatest from "../useLatest";

const useUnmount = (fn: () => void) => {
  if (process.env.NODE_ENV === "development") {
    if (typeof fn !== "function") {
      console.error(
        `useUnmount expected parameter is a function, got ${typeof fn}`
      );
    }
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export default useUnmount;
