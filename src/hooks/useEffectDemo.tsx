import React, { useState ,useEffect, useRef, } from 'react';
import { useUpdateEffect } from 'ahooks';

type effectHookType = typeof useEffect;

const createUpdateEffect = function (hook:effectHookType) {
  return function (effect, deps) {
    var isMounted = useRef(false); // for react-refresh

    hook(function () {
      return function () {
        isMounted.current = false;
      };
    }, []);
    hook(function () {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
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

    personalUseUpdateEffect(() => {
        console.log('____++++++personalupdateEffect', name)
      }, [name]);

    useUpdateEffect(() => {
        console.log('+++++++updateEffect', sex)
      }, [sex]);


    console.log('after useEffect')

    return <span id='name' ref={nameRef}>我的名字：{name}</span>

}