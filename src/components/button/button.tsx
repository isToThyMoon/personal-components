/*
 * @Author: 王荣
 * @Date: 2022-02-28 16:16:36
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-01 16:29:19
 * @Description: Button组件 分常规button和可跳转的链接类型button
 */

import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";

export type ButtonSize = "sm" | "medium" | "lg";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];

  href?: string;
}
/* 组合自定义button props 和原生button props */
type CombineButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;
/* 组合自定义button props 和原生a标签props */
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = Partial<CombineButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, size, type, htmlType, href, ...resProps } =
    props;

  if (type === "link" && href) {
    return <a></a>;
  } else {
    return <button></button>;
  }
};

export default Button;
