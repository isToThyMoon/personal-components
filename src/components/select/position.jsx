/*
 * @Author: 王荣
 * @Date: 2022-03-15 23:15:01
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-16 00:54:25
 * @Description: 填写简介
 */
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './position.scss';
// import classNames from 'classnames';

// let instance = null;
// console.log(instance)
export const Position = (props) => {
    const { visible, targetRef, children, getContainer, onNotVisibleArea,  } = props;
    const container = getContainer && getContainer();
    const instance = useRef(null);
    console.log(instance.current)
    // console.log(visible)

    useEffect(()=>{
      if(visible){
        console.log(instance.current.classList)
        instance.current?.classList.add('visible')
      }else{
        instance.current?.classList.remove('visible')
      }
      
    },[visible])

    useEffect(()=>{
      instance.current = document.createElement('div');
      console.log(instance)
      instance.current.className = 'll-position';
      document.body.appendChild(instance.current);
    },[])
    // if (!instance.current) {
    //     instance.current = document.createElement('div');
    //     console.log(instance)
    //     instance.current.className = 'll-position';
    //     document.body.appendChild(instance.current);

    // }

    useEffect(() => {

        function setInstanceStyle() {
          // console.log(targetRef)
            const { top, left, height } = targetRef.current.getBoundingClientRect();
            // console.log(top, left, height)
            const style = {
                top: document.documentElement.scrollTop + top + height + 'px',
                left: document.documentElement.scrollLeft + left + 'px'
            }
            // console.log(style.top, style.left)
            instance.current.style.top = style.top;
            instance.current.style.left = style.left;

            return { top, left, height }
        }

        setInstanceStyle();

        function handleScroll() {
            const { top, height } = setInstanceStyle();
            
            if (container.offsetTop > top) {
                onNotVisibleArea();
            }
            if (top - container.offsetTop + height > container.offsetHeight) {
                onNotVisibleArea();
            }
        }

        if (container) {
            container.addEventListener('scroll', handleScroll, false);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll, false);
            }
        }

    }, [targetRef, container, onNotVisibleArea ])
    // container, onNotVisibleArea 
    return instance.current && ReactDOM.createPortal(children, instance.current);
}
