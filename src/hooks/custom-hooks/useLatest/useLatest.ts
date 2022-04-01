/*
 * @Author: 王荣
 * @Date: 2022-03-31 23:31:59
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-31 23:50:28
 * @Description: 填写简介
 */
import { useRef } from "react";

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
