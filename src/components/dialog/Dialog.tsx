import React from "react";
import ReactDOM from "react-dom";

interface Iconfig {
  content: React.ReactElement;
}
interface DialogProps {}
interface DialogState {}

export class Dialog extends React.Component<DialogProps, DialogState> {
  el: HTMLDivElement;

  constructor(props: DialogProps) {
    super(props);
    this.el = document.createElement("div");
    this.el.style.width = "200px";
    this.el.style.height = "200px";
    this.el.style.backgroundColor = "green";
    this.el.style.position = "absolute";
    this.el.style.top = "200px";
    this.el.style.left = "400px";
    this.el.id = "dialog-box";
  }

  show(config: Iconfig) {
    // 销毁
    const dom = document.querySelector("#dialog-box");
    if (!dom) {
      //兼容多次点击
      // 显示
      document.body.appendChild(this.el);
      ReactDOM.render(config.content, this.el);
    }
  }

  destroy() {
    // 销毁
    const dom = document.querySelector("#dialog-box");
    if (dom) {
      //兼容多次点击
      ReactDOM.unmountComponentAtNode(this.el);
      dom.parentNode?.removeChild(dom);
    }
  }

  componentDidMount() {}
}

const exportedObject = {
  show: function (config: Iconfig) {
    // new Dialog().show(config);
  },
  hide: function () {
    // new Dialog().destroy();
  },
};
export default exportedObject;
