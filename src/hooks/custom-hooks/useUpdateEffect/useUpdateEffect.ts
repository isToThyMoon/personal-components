/*
 * @Author: 王荣
 * @Date: 2022-02-28 14:16:16
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-05 13:26:42
 * @Description: 填写简介
 */
import { useEffect, useLayoutEffect, useRef } from "react";
// import { effectHookType } from "../type";
type effectHookType = typeof useEffect | typeof useLayoutEffect;

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
