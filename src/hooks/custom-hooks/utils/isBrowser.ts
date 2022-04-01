/*
 * @Author: 王荣
 * @Date: 2022-04-01 09:52:17
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-01 09:59:40
 * @Description: 填写简介
 */

const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export default isBrowser;
