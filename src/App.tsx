/*
 * @Author: 王荣
 * @Date: 2022-02-11 14:25:28
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-29 20:23:06
 * @Description: 填写简介
 */
import { Provider } from "react-redux";
import { store } from "./reduxToolkitDemo/store";
import { Project } from "./reduxToolkitDemo/view/project";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div>App</div>
        <Project></Project>
      </Provider>
    </div>
  );
}

export default App;
