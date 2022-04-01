/*
 * @Author: 王荣
 * @Date: 2022-04-01 09:53:07
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-01 10:00:02
 * @Description: 填写简介
 */

import { useEffect } from "react";
import createEffectWithTarget from "./createEffectWithTarget";

const useEffectWithTarget = createEffectWithTarget(useEffect);

export default useEffectWithTarget;
