/*
 * @Author: 王荣
 * @Date: 2022-04-26 21:35:54
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-26 23:16:46
 * @Description: 填写简介
 */

import React, { HTMLAttributes } from "react";
import Portal from "components/util/portal";
import TriggerContext from "./context";

interface TriggerProps {
  popupVisible: boolean;
  defaultPopupVisible: boolean;
  prefixCls?: string;
}

interface TriggerState {
  prevPopupVisible: boolean;
  popupVisible: boolean;
  // point?: Point;
}

export function generateTrigger(
  PortalComponent: any
): React.ComponentClass<TriggerProps> {
  return class Trigger extends React.Component<TriggerProps, TriggerState> {
    constructor(props: TriggerProps) {
      super(props);

      let popupVisible: boolean;
      if ("popupVisible" in props) {
        popupVisible = !!props.popupVisible;
      } else {
        popupVisible = !!props.defaultPopupVisible;
      }

      this.state = {
        prevPopupVisible: popupVisible,
        popupVisible,
      };
    }

    // attachParent = (popupContainer: HTMLElement) => {
    //   raf.cancel(this.attachId);

    //   const { getPopupContainer, getDocument } = this.props;
    //   const domNode = this.getRootDomNode();

    //   let mountNode: HTMLElement;
    //   if (!getPopupContainer) {
    //     mountNode = getDocument(this.getRootDomNode()).body;
    //   } else if (domNode || getPopupContainer.length === 0) {
    //     // Compatible for legacy getPopupContainer with domNode argument.
    //     // If no need `domNode` argument, will call directly.
    //     // https://codesandbox.io/s/eloquent-mclean-ss93m?file=/src/App.js
    //     mountNode = getPopupContainer(domNode);
    //   }

    //   if (mountNode) {
    //     mountNode.appendChild(popupContainer);
    //   } else {
    //     // Retry after frame render in case parent not ready
    //     this.attachId = raf(() => {
    //       this.attachParent(popupContainer);
    //     });
    //   }
    // };

    getContainer = () => {
      // if (!this.portalContainer) {
      //   // In React.StrictMode component will call render multiple time in first mount.
      //   // When you want to refactor with FC, useRef will also init multiple time and
      //   // point to different useRef instance which will create multiple element
      //   // (This multiple render will not trigger effect so you can not clean up this
      //   // in effect). But this is safe with class component since it always point to same class instance.
      //   const { getDocument } = this.props;
      //   const popupContainer = getDocument(this.getRootDomNode()).createElement(
      //     'div',
      //   );
      //   // Make sure default popup container will never cause scrollbar appearing
      //   // https://github.com/react-component/trigger/issues/41
      //   popupContainer.style.position = 'absolute';
      //   popupContainer.style.top = '0';
      //   popupContainer.style.left = '0';
      //   popupContainer.style.width = '100%';
      //   this.portalContainer = popupContainer;
      // }
      // this.attachParent(this.portalContainer);
      // return this.portalContainer;
    };

    getComponent = () => {
      const {
        prefixCls,
        // destroyPopupOnHide,
        // popupClassName,
        // onPopupAlign,
        // popupMotion,
        // popupAnimation,
        // popupTransitionName,
        // popupStyle,
        // mask,
        // maskAnimation,
        // maskTransitionName,
        // maskMotion,
        // zIndex,
        // popup,
        // stretch,
        // alignPoint,
        // mobile,
        // forceRender,
      } = this.props;
      // const { popupVisible, point } = this.state;

      // const align = this.getPopupAlign();

      // const mouseProps: HTMLAttributes<HTMLElement> = {};
      // if (this.isMouseEnterToShow()) {
      //   mouseProps.onMouseEnter = this.onPopupMouseEnter;
      // }
      // if (this.isMouseLeaveToHide()) {
      //   mouseProps.onMouseLeave = this.onPopupMouseLeave;
      // }

      // mouseProps.onMouseDown = this.onPopupMouseDown;
      // mouseProps.onTouchStart = this.onPopupMouseDown;

      // return (
      //   <Popup
      //     prefixCls={prefixCls}
      //     destroyPopupOnHide={destroyPopupOnHide}
      //     visible={popupVisible}
      //     point={alignPoint && point}
      //     className={popupClassName}
      //     align={align}
      //     onAlign={onPopupAlign}
      //     animation={popupAnimation}
      //     getClassNameFromAlign={this.getPopupClassNameFromAlign}
      //     {...mouseProps}
      //     stretch={stretch}
      //     getRootDomNode={this.getRootDomNode}
      //     style={popupStyle}
      //     mask={mask}
      //     zIndex={zIndex}
      //     transitionName={popupTransitionName}
      //     maskAnimation={maskAnimation}
      //     maskTransitionName={maskTransitionName}
      //     maskMotion={maskMotion}
      //     ref={this.popupRef}
      //     motion={popupMotion}
      //     mobile={mobile}
      //     forceRender={forceRender}
      //   >
      //     {typeof popup === 'function' ? popup() : popup}
      //   </Popup>
      // );
    };

    onPopupMouseDown = () => {};

    triggerContextValue = { onPopupMouseDown: this.onPopupMouseDown };

    static getDerivedStateFromProps(
      { popupVisible }: TriggerProps,
      prevState: TriggerState
    ) {
      const newState: Partial<TriggerState> = {};

      if (
        popupVisible !== undefined &&
        prevState.popupVisible !== popupVisible
      ) {
        newState.popupVisible = popupVisible;
        newState.prevPopupVisible = prevState.popupVisible;
      }

      return newState;
    }

    render() {
      const { popupVisible } = this.state;
      const { children } = this.props;
      const child = React.Children.only(children) as React.ReactElement;

      const newChildProps: HTMLAttributes<HTMLElement> & { key: string } = {
        key: "trigger",
      };
      const cloneProps: any = {
        ...newChildProps,
      };
      const trigger = React.cloneElement(child, cloneProps);

      let portal: React.ReactElement | null = null;
      // prevent unmounting after it's rendered
      if (popupVisible) {
        portal = (
          <PortalComponent key="portal" getContainer={this.getContainer}>
            {this.getComponent()}
          </PortalComponent>
        );
      }

      return (
        <TriggerContext.Provider value={this.triggerContextValue}>
          {trigger}
          {portal}
        </TriggerContext.Provider>
      );
    }

    componentDidMount() {
      // this.componentDidUpdate();
    }
  };
}

export default generateTrigger(Portal);
