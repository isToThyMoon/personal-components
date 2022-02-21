import React, { useState ,useEffect, useRef, } from 'react';

import { useUpdateEffect } from './hooks/custom-hooks/hookDemoWithDTS'

type effectHookType = typeof useEffect;

const createUpdateEffect = function (hook:effectHookType) {
  return function (effect, deps?:any) {
    var isMounted = useRef(false); // for react-refresh
    hook(function () {
      return function () {
        console.log('createUpdateEffect: 清除effect')
        isMounted.current = false;
      };
    }, []);

    hook(function () {
      if (!isMounted.current) {
        console.log('createUpdateEffect: 设置ismounted true 立即生效')
        isMounted.current = true;
      } else {
        console.log('执行effect')
        return effect();
      }
    }, deps);
  };
  
};

const personalUseUpdateEffect = createUpdateEffect(useEffect);

export const UseEffectDemo:React.FC<{}> = (props) => {
    const [name, setName] = useState('da');
    const [sex, setSex] = useState('0');

    const nameRef = useRef<HTMLSpanElement>(null);
    console.log('function body: name beforeEffect',name)
    console.log('function body: sex beforeEffect',sex)
    console.log('function body: name Element', document.querySelector('#name'))

    useEffect(()=>{
            console.log('useEffect: before setName')
            setName('dididi')
            setSex('1')
            console.log('useEffect: after setName')
            console.log('useEffect: Ref name Element width', nameRef.current?.offsetWidth)
    },[])

    // useEffect(()=>{
    //   console.log('每次都执行')
    //   return ()=>{
    //     console.log('执行清除操作')
    //   }

    // })

    useUpdateEffect(() => {
        console.log('_______updateEffect name', name)
      }, [name]);

    // useUpdateEffect(() => {
    //   console.log('!!!!!!!!!!!wupdateEffect 无依赖', name)
    // });

    personalUseUpdateEffect(() => {
      console.log('^^^^^^^^^personalupdateEffect 无依赖', name)
    });

    personalUseUpdateEffect(() => {
      console.log('+++++++personalupdateEffect name', name)
    }, [name]);

    personalUseUpdateEffect(() => {
      console.log('+++++++personalupdateEffect sex', sex)
    }, [sex]);

    // useUpdateEffect(() => {
    //     console.log('_______updateEffect sex', sex)
    //   }, [sex]);


    console.log('function body: after useEffect')

    return <div>
            <span id='name' ref={nameRef}>我的名字：{name}性别：{sex}</span>
			<button onClick={()=>{
				setSex(sex==='0' ? '1' : '0')
			}}>改性别</button>
          </div>

}