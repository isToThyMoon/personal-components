/*
 * @Author: 王荣
 * @Date: 2022-02-11 14:25:28
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-16 00:05:35
 * @Description: 填写简介
 */
import { Button } from "./components";
import { Select, SelectMenu } from "./components";

function App() {
  return (
    <div className="App">
      <div>App</div>
      <Button></Button>
      <div>
        <div style={{ background: "red", height: "200px" }}></div>
        <div id="area" style={{ margin: 10, overflow: "scroll", height: 500 }}>
          <div style={{ padding: 100, height: 1000, background: "#eee" }}>
            <h4>滚动的区域</h4>
            <h4>滚动的区域</h4>
            <Select getContainer={() => document.getElementById("area")}>
              <SelectMenu label="第一1" value="1"></SelectMenu>
              <SelectMenu label="第二2" value="2"></SelectMenu>
              <SelectMenu label="第三3" value="3"></SelectMenu>
              <SelectMenu label="第四4" value="4"></SelectMenu>
            </Select>
          </div>
        </div>
        <Select>
          <SelectMenu label="第一" value="1"></SelectMenu>
          <SelectMenu label="第二" value="2"></SelectMenu>
          <SelectMenu label="第三" value="3"></SelectMenu>
          <SelectMenu label="第四" value="4"></SelectMenu>
        </Select>
      </div>
    </div>
  );
}

export default App;
