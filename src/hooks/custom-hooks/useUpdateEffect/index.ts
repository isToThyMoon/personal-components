/*
 * @Author: 王荣
 * @Date: 2022-02-28 14:16:16
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-28 14:49:33
 * @Description: 填写简介
 */
import { useEffect, useRef } from "react";
import { effectHookType } from "../type";

export const createUpdateEffect = function createUpdateEffect(
  hook: effectHookType
): effectHookType {
  return function (effect, deps) {
    var isMounted = useRef(false); // for react-refresh

    hook(function () {
      return function () {
        isMounted.current = false;
      };
    }, []);
    hook(function () {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return effect();
      }
    }, deps);
  };
};

export default createUpdateEffect(useEffect);
