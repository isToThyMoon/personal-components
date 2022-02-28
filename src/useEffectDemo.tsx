/*
 * @Author: 王荣
 * @Date: 2022-02-28 14:16:16
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-28 14:50:34
 * @Description: 填写简介
 */
import React, { useState, useEffect, useRef } from "react";

import { useUpdateEffect } from "./hooks/custom-hooks";

export const UseEffectDemo: React.FC<{}> = (props) => {
  const [name, setName] = useState("da");
  const [sex, setSex] = useState("0");

  const nameRef = useRef<HTMLSpanElement>(null);
  console.log("function body: name beforeEffect", name);
  console.log("function body: sex beforeEffect", sex);
  console.log("function body: name Element", document.querySelector("#name"));

  useEffect(() => {
    console.log("useEffect: before setName");
    setName("dididi");
    setSex("1");
    console.log("useEffect: after setName");
    console.log(
      "useEffect: Ref name Element width",
      nameRef.current?.offsetWidth
    );
  }, []);

  useUpdateEffect(() => {
    console.log("_______updateEffect name", name);
  }, [name]);

  console.log("function body: after useEffect");

  return (
    <div>
      <span id="name" ref={nameRef}>
        我的名字：{name}性别：{sex}
      </span>
      <button
        onClick={() => {
          setSex(sex === "0" ? "1" : "0");
        }}
      >
        改性别
      </button>
    </div>
  );
};
