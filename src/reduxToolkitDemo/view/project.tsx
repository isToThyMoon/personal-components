/*
 * @Author: 王荣
 * @Date: 2022-02-24 22:54:18
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-25 11:47:02
 * @Description: 填写简介
 */

import {  useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store";
import { projectActions } from "./project.slice";


export const Project = () => {
    const dispatch = useDispatch<AppDispatch>(); // 不需要再通过高阶组件connect的方法来连接redux的store和组件的属性（props） 直接使用hook引入
    const { projectModalOpen } = useSelector((state:RootState)=> state.ProjectList); //读总状态树里的状态 是总的状态树，这也是为什么selectProjectModalOpen要做一个函数返回

    return (
        // <Provider store={store}>
            <div>
                <div>{String(projectModalOpen)}</div>
                <button
                    onClick={()=>{
                        console.log('修改redux')
                        dispatch(projectActions.openProjectModal(true))
                    }}
                >修改redux的store内容 开</button>

                <button
                    onClick={()=>{
                        console.log('修改redux')
                        dispatch(projectActions.closeProjectModal(false))
                    }}
                >修改redux的store内容 关</button>
            </div>
        // </Provider>
    )
}