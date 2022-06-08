/*
 * @Author: 王荣
 * @Date: 2022-03-15 23:13:24
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-15 23:24:50
 * @Description: 填写简介
 */

import {useState, useEffect } from 'react';
import './menu.scss';

export const SelectMenu = (props) => {
  const [ selected, setSelected ] = useState(false);
  const { label, value, className = '', handleSelect, defaultValue } = props;

  useEffect(() => {
      if (defaultValue === value) {
          setSelected(true);
      }
  }, [value, defaultValue])
  return (
      <div 
          onClick={() => handleSelect({value, label})} 
          className={`${className} ${selected ? 'll-selected': ''}`}>{label}</div>
  )
}
