/*
 * @Author: 王荣
 * @Date: 2022-04-26 22:52:37
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-27 21:18:28
 * @Description: 填写简介
 */
import * as React from "react";

interface TriggerContextProps {
  onPopupMouseDown: React.MouseEventHandler<HTMLElement>;
}

const TriggerContext = React.createContext<TriggerContextProps | null>(null);

export default TriggerContext;
