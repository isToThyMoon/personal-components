/*
 * @Author: 王荣
 * @Date: 2022-02-28 16:16:36
 * @LastEditors: 王荣
 * @LastEditTime: 2022-05-07 16:47:36
 * @Description: Button组件 分常规button和可跳转的链接类型button
 */

import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";
import { Button as AntButton } from "antd";
/* asset */
import globalConfig from "config";
import "./_button.scss";
/* utils */
import classnames from "classnames";

export type ButtonSize = "sm" | "medium" | "lg";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  overlayStyle?: React.CSSProperties;
  size?: ButtonSize;
  type?: ButtonType;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon?: React.ReactElement;

  href?: string;
}
/* 组合自定义button props 和原生button props */
type CombineButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;
/* 组合自定义button props 和原生a标签props */
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = Partial<CombineButtonProps & AnchorButtonProps>;

const classPrefix = globalConfig.componentPrefix;

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    overlayStyle,
    size = "medium",
    type = "default",
    htmlType,
    icon,
    href,
    ...resProps
  } = props;

  const classname = classnames(classPrefix + "-btn", className, {
    [classPrefix + "-btn-" + size]: size,
    [classPrefix + "-btn-" + type]: type,
  });

  if (type === "link" && href) {
    // return <a></a>;
    return (
      <div>
        <AntButton>dada</AntButton>
      </div>
    );
  } else {
    return (
      <button
        className={classname}
        style={overlayStyle}
        type={htmlType}
        {...resProps}
      >
        {icon && <span className="icon-affix">{icon}</span>}
        {children}
      </button>
    );
  }
};

export default Button;
