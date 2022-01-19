import React, { useState ,useEffect, useRef, } from 'react';
import { useUpdateEffect } from 'ahooks';

// function useOnUpdate(fn: () => void, ...dep:any[]) {
//     const ref = useRef({ fn, mounted: false })
//     ref.current.fn = fn;

//     useEffect(() => {
//         // 首次渲染不执行
//         if (!ref.current.mounted) {
//         ref.current.mounted = true
//         } else {
//         ref.current.fn()
//         }
//     }, [dep])
// }

export const UseEffectDemo:React.FC<{}> = (props) => {
    const [name, setName] = useState('da');
    const [sex, setSex] = useState('0');

    const nameRef = useRef<HTMLSpanElement>(null);
    console.log('name beforeEffect',name)
    console.log('sex beforeEffect',sex)
    console.log('name Element', document.querySelector('#name'))

    useEffect(()=>{
            console.log('before setName')
            setName('dididi')
            setSex('1')
            console.log('after setName')
            console.log('Ref name Element width', nameRef.current?.offsetWidth)
    },[])

    // useEffect(()=>{
    //     console.log(name)
    // }, [name])


    useUpdateEffect(() => {
        console.log('_______updateEffect', name)
      }, [name]);

    useUpdateEffect(() => {
        console.log('+++++++updateEffect', sex)
      }, [sex]);


    console.log('after useEffect')

    return <span id='name' ref={nameRef}>我的名字：{name}</span>

}