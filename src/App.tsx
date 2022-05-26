/*
 * @Author: 王荣
 * @Date: 2022-02-11 14:25:28
 * @LastEditors: 王荣
 * @LastEditTime: 2022-05-09 09:58:06
 * @Description: 填写简介
 */

import React from "react";
import "./App.scss";
import TwoLineTextWithOrNotToolTip from "oss-quick-copy-use/truncated-text/truncated-text";

function App() {
  return (
    <div className="App">
      <TwoLineTextWithOrNotToolTip
        text={"jiang发对味就拉夫i哦为就来u发i哦"}
        lines={2}
      ></TwoLineTextWithOrNotToolTip>
    </div>
  );
}

export default App;
