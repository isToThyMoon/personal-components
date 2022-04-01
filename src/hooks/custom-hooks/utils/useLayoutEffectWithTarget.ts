/*
 * @Author: 王荣
 * @Date: 2022-04-01 09:53:40
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-01 09:59:39
 * @Description: 填写简介
 */

import { useLayoutEffect } from "react";
import createEffectWithTarget from "./createEffectWithTarget";

const useEffectWithTarget = createEffectWithTarget(useLayoutEffect);

export default useEffectWithTarget;
