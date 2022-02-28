/*
 * @Author: 王荣
 * @Date: 2022-02-28 11:14:36
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-28 11:17:58
 * @Description: useImmerReducer hook使用demo
 */

import { useImmerReducer } from "use-immer";

const initialState = { salary: 0 };

function reducer(draft, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return void draft.salary++;
    case "decrement":
      return void draft.salary--;
  }
}

export default function () {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return (
    <>
      期待工资: {state.salary}K
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>重置</button>
    </>
  );
}