/*
 * @Author: 王荣
 * @Date: 2022-04-26 21:36:03
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-29 22:13:15
 * @Description: 填写简介
 */

import React from "react";
import Trigger from "components/rc-rigger/trigger";
import classNames from "classnames";

export interface DropdownProps {
  children: React.ReactElement;
  prefixCls?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  overlay?: (() => React.ReactElement) | React.ReactElement;
  overlayClassName?: string;
  openClassName: string;
  overlayStyle?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

function Dropdown(props: DropdownProps, ref) {
  const {
    prefixCls = "rc-dropdown",
    getPopupContainer,
    overlayClassName,
    overlayStyle,
    visible,
    ...otherProps
  } = props;
  const [triggerVisible, setTriggerVisible] = React.useState<boolean>();
  const mergedVisible = "visible" in props ? visible : triggerVisible;

  const triggerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => triggerRef.current);

  const onVisibleChange = (newVisible: boolean) => {
    const { onVisibleChange: onVisibleChangeProp } = props;
    setTriggerVisible(newVisible);
    if (typeof onVisibleChangeProp === "function") {
      onVisibleChangeProp(newVisible);
    }
  };

  const getMenuElement = () => {
    // const overlayElement = getOverlayElement();
    // // @ts-ignore
    // const composedMenuRef = composeRef(menuRef, overlayElement.ref);

    // const extraOverlayProps = {
    //   prefixCls: menuClassName,
    //   onClick,
    //   ref: supportRef(overlayElement) ? composedMenuRef : undefined,
    // };
    // if (typeof overlayElement.type === 'string') {
    //   delete extraOverlayProps.prefixCls;
    // }
    // return (
    //   <>
    //     {arrow && <div className={`${prefixCls}-arrow`} />}
    //     {React.cloneElement(overlayElement, extraOverlayProps)}
    //   </>
    // );

    return null;
  };

  const getMenuElementOrLambda = () => {
    const { overlay } = props;
    if (typeof overlay === "function") {
      return getMenuElement;
    }
    return getMenuElement();
  };

  const getOpenClassName = () => {
    const { openClassName } = props;
    if (openClassName !== undefined) {
      return openClassName;
    }
    return `${prefixCls}-open`;
  };

  const renderChildren = () => {
    const { children } = props;
    const childrenProps = children.props ? children.props : {};
    const childClassName = classNames(
      childrenProps.className,
      getOpenClassName()
    );
    return mergedVisible && children
      ? React.cloneElement(children, {
          className: childClassName,
        })
      : children;
  };

  return (
    <Trigger
      prefixCls={prefixCls}
      ref={triggerRef}
      popupVisible={mergedVisible}
      popup={getMenuElementOrLambda()}
      onPopupVisibleChange={onVisibleChange}
      getPopupContainer={getPopupContainer}
    >
      {renderChildren()}
    </Trigger>
  );
}

export default React.forwardRef(Dropdown);
