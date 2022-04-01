/*
 * @Author: 王荣
 * @Date: 2022-04-01 09:50:21
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-01 09:59:59
 * @Description: 填写简介
 */

import isBrowser from "./isBrowser";
import useEffectWithTarget from "./useEffectWithTarget";
import useLayoutEffectWithTarget from "./useLayoutEffectWithTarget";

const useIsomorphicLayoutEffectWithTarget = isBrowser
  ? useLayoutEffectWithTarget
  : useEffectWithTarget;

export default useIsomorphicLayoutEffectWithTarget;
