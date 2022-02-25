/*
 * @Author: 王荣
 * @Date: 2022-02-23 22:03:12
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-24 19:02:07
 * @Description: 填写简介
 */
import  { useEffect } from "react";
import { effectHookType } from "../../model";


/**
 * @description: 
 * @param {effectHookType} hook
 * @return {effectHookType}
 */
const createMountEffect = (hook:effectHookType):effectHookType => {

    return function(effect){
        hook(()=>{
            effect();
        },[])
    }

}
// /**
//  * @description: 
//  * @param {React.EffectCallback} effect
//  * @return {*}
//  */
// export const useaMountEffect = (effect:React.EffectCallback):effectHookType => {
//     useEffect(()=>{
//         effect();
//     // eslint-disable-next-line 
//     },[])
// }

const useMountEffect = createMountEffect(useEffect)
export default useMountEffect;


