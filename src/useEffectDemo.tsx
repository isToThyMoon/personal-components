/*
 * @Author: 王荣
 * @Date: 2022-02-11 14:25:28
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-25 11:21:04
 * @Description: 填写简介
 */
import React, { useState, useEffect, useRef, } from 'react';

import { useUpdateEffect, useMountEffect } from './hooks/custom-hooks'
import { useDebounce } from './hooks/custom-hooks/useDebounce';

export const UseEffectDemo: React.FC<{}> = (props) => {
    const [name, setName] = useState('da');
    const [sex, setSex] = useState('0');
    const [inputValue, setInputValue] = useState('')
    const [debouncedInputValue, setDebouncedInputValue] = useState('')
    const debouncedValue = useDebounce(inputValue, 2000)

    const nameRef = useRef<HTMLSpanElement>(null);
    console.log('function body: name beforeEffect', name)
    console.log('function body: sex beforeEffect', sex)
    console.log('function body: name Element', document.querySelector('#name'))

    useEffect(() => {
        console.log('useEffect: before setName')
        setName('dididi')
        setSex('1')
        console.log('useEffect: after setName')
        console.log('useEffect: Ref name Element width', nameRef.current?.offsetWidth)
    }, [])

    useMountEffect(() => {
        console.log('只在mount执行一次')
    })
    useUpdateEffect(() => {
        console.log('_______updateEffect name', name)
    }, [name]);

    useUpdateEffect(() => {
        console.log('防抖操作')
        setDebouncedInputValue(debouncedValue);
    }, [debouncedValue])

    console.log('function body: after useEffect')

    return <div>
        <input type="text" value={inputValue} onChange={(e) => {
            setInputValue(e.target.value)
        }} />
        <div>input值：{debouncedInputValue}</div>
        <span id='name' ref={nameRef}>我的名字：{name}性别：{sex}</span>
        <button onClick={() => {
            setSex(sex === '0' ? '1' : '0')
        }}>改性别</button>
    </div>

}