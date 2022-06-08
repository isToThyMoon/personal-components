/*
 * @Author: 王荣
 * @Date: 2022-03-15 23:16:45
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-16 00:44:36
 * @Description: 填写简介
 */
import React, { useState, useRef, useEffect } from 'react';
import './select.scss';
import { Position } from './position';
// import classNames from 'classnames';


export const Select = (props) => {
  const { defaultValue, onChange, getContainer } = props;
  // 控制下拉框显示/隐藏
  const [visible, setVisible] = useState(false);
  // 当前选中的值
  const [data, setData] = useState({ value: defaultValue, label: '' });
  // 是否设置默认值
  const [defaultValueState, setDefaultValueState] = useState(true)
  const inputRef = useRef(null);

  // 查找defaultValue对应的label并展示出来
  useEffect(() => {
    if (!defaultValueState) return;
    const i = props.children.findIndex(n => n.props.value === defaultValue);
    if (i > -1) {
      setData(props.children[i].props);
      setDefaultValueState(true);
    }
  }, [defaultValue, props.children, defaultValueState])

  function handleSelect(data) {
    setData(data);
    onChange && onChange(data);
    setVisible(false);
  }

  function bindBodyClick(e) {
    if (e.target === inputRef.current) return;
    setVisible(false);
  }

  useEffect(() => {
    document.addEventListener('click', bindBodyClick, false);
    return () => {
      document.removeEventListener('click', bindBodyClick, false);
    }
  }, [visible])

  return (
    <React.Fragment>
      <input
        defaultValue={data.label}
        onClick={() => setVisible(true)}
        ref={inputRef}
        readOnly />
      {/* <div className={classNames('position-wrap',{
        'visible': visible
      })}> */}
        <Position
          visible={visible}
          onNotVisibleArea={() => setVisible(false)}
          getContainer={getContainer}
          targetRef={inputRef}>
          {
            React.Children.map(props.children, child => (
              React.cloneElement(child, {
                defaultValue: data.value,
                handleSelect
              })
            ))
          }
        </Position>
      {/* </div> */}

    </React.Fragment>
  )
}
