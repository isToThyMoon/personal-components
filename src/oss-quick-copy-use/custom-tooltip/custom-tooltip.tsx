/*
 * @Author: 王荣
 * @Date: 2022-04-28 09:30:58
 * @LastEditors: 王荣
 * @LastEditTime: 2022-05-07 20:16:05
 * @Description: 填写简介
 */
import React from "react";
import "./custom-tooltip.scss";

import { Tooltip } from "antd";

import { TooltipPlacement } from "antd/lib/tooltip";

import classNames from "classnames";

export interface CustomToolTipProps {
  children: React.ReactNode;
  title: React.ReactNode;
  visible?: boolean;
  placement?: TooltipPlacement;
  color?: string;
  overlayInnerStyle?: React.CSSProperties;
  overlayClassName?: string;
  align?: any;
}

class CustomToolTip extends React.Component<CustomToolTipProps> {
  constructor(props: CustomToolTipProps) {
    super(props);
  }

  render(): React.ReactNode {
    const {
      title,
      placement,
      visible,
      overlayClassName,
      overlayInnerStyle,
      color,
      align,
      children,
    } = this.props;
    return (
      <Tooltip
        visible={visible}
        title={title}
        placement={placement}
        overlayClassName={classNames("custom-tooltip", overlayClassName, {})}
        overlayInnerStyle={overlayInnerStyle}
        color={color}
        align={align}
      >
        {children}
      </Tooltip>
    );
  }
}

export { CustomToolTip };
