/*
 * @Author: 王荣
 * @Date: 2022-04-26 21:38:16
 * @LastEditors: 王荣
 * @LastEditTime: 2022-04-26 21:38:17
 * @Description: 填写简介
 */

export default function canUseDom() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}
