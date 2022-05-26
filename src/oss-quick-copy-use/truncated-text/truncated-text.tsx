/*
 * @Author: 王荣
 * @Date: 2022-04-28 09:30:13
 * @LastEditors: 王荣
 * @LastEditTime: 2022-05-09 09:57:54
 * @Description: 填写简介
 */
import { ListConsumer } from "antd/lib/list";
import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { CustomToolTip } from "../custom-tooltip/custom-tooltip";
import "./truncated-text.scss";

interface TruncatedTextProps {
  //控制超出几行后文字才折叠隐藏
  lines: number;
  text: string | ReactElement;
  color?: string;
  overlayInnerStyle?: React.CSSProperties;
}

interface TruncatedTextState {
  showToolTip: boolean;
}

class TruncatedText extends React.Component<
  TruncatedTextProps,
  TruncatedTextState
> {
  textRef: React.RefObject<HTMLDivElement>;

  constructor(props: TruncatedTextProps) {
    super(props);
    this.textRef = React.createRef();
    this.state = {
      showToolTip: false,
    };
  }

  render(): React.ReactNode {
    const { showToolTip } = this.state;
    const { lines, text, color, overlayInnerStyle } = this.props;
    return (
      <div
        ref={this.textRef}
        className={
          // "twoline-textcut-wrap twoline-textcut-wrap-" + this.props.tag
          "twoline-textcut-wrap"
        }
        style={{
          WebkitLineClamp: lines,
        }}
      >
        {showToolTip ? (
          <CustomToolTip
            title={text}
            color={color}
            placement="topLeft"
            overlayInnerStyle={overlayInnerStyle}
          >
            {text}
          </CustomToolTip>
        ) : (
          text
        )}
      </div>
    );
  }

  componentDidMount(): void {
    // console.log('!!!!!componentDidMount推广效果', this.props.text)
    // const node = document.querySelector(
    //   ".twoline-textcut-wrap-" + this.props.tag
    // ) as HTMLElement;
    const node = this.textRef.current as HTMLDivElement;

    // console.log("node?.clientHeight", node?.clientHeight);
    // console.log("node?.scrollHeight", node?.scrollHeight);
    node?.clientHeight < node?.scrollHeight &&
      this.setState({ showToolTip: true });
  }
}

export default TruncatedText;
