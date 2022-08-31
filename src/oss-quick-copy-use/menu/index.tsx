/*
 * @Author: 王荣
 * @Date: 2022-08-30 13:36:53
 * @LastEditors: 王荣
 * @LastEditTime: 2022-08-30 15:43:07
 * @Description: 填写简介
 */

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./index.scss";

interface AppProps {}

const Menu: React.FC<AppProps> = (props) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  /**
   * @description: 根据nextOpen 下一个需要的open状态
   * 设置下拉drop的高度是0还是由所有子项撑满
   * @param {boolean} nextOpen
   * @return {*}
   */
  const changeHeight = (nextOpen: boolean): any => {
    //  display表示默认更多展开元素是显示状态还是隐藏
    function calcHeight() {
      var height = 0;
      console.log(menuRef.current && menuRef.current.childNodes);
      menuRef.current &&
        Array.from(menuRef.current.childNodes)
          .slice()
          .forEach((child) => {
            if (child.nodeType === 1) {
              var childCssStyles = window.getComputedStyle(child as Element);
              console.log((child as Element).clientHeight);
              // console.log(childCssStyles)
              height +=
                (child as Element).clientHeight +
                (parseInt(childCssStyles.borderTopWidth) || 0) +
                (parseInt(childCssStyles.borderBottomWidth) || 0);
            }
          });
      return height;
    }
    // 现代浏览器
    if (typeof window.screenX === "number") {
      if (menuRef.current) {
        if (nextOpen) {
          menuRef.current.style.height = calcHeight() + "px";
          menuRef.current.style.opacity = "1";
        } else {
          menuRef.current.style.height = "0px";
          menuRef.current.style.opacity = "0";
        }
      }
    } else {
      // ie
      if (menuRef.current) {
        if (nextOpen) {
          menuRef.current.style.height = "auto";
        } else {
          menuRef.current.style.height = "0px";
        }
      }
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    changeHeight(!open);
  };

  return (
    <div>
      <div className="menu-title" onClick={handleOpen}>
        select
      </div>
      <ul
        ref={menuRef}
        className={classNames("menu", {
          // 改变menu open状态时，所有js代码执行完毕让出线程给渲染线程绘制，
          // 此时dom和css dom准备好
          // 采用menu-open设置的transition缓动规则开始运动展开。
          // 关闭状态反之
          "menu-open": open,
        })}
      >
        <li className="menu-item">12314</li>
        <li className="menu-item">12314</li>
        <li className="menu-item">12314</li>
        <li className="menu-item">12314</li>
        <li className="menu-item">12314</li>
        <li className="menu-item">12314</li>
        <li className="menu-item">12314</li>
      </ul>
      <div>dadada</div>
    </div>
  );
};

export default Menu;
