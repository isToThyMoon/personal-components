/*
 * @Author: 王荣
 * @Date: 2022-02-11 14:25:28
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-24 23:21:25
 * @Description: 填写简介
 */
// import Dialog from  './dialog/Dialog';
import { Provider } from 'react-redux';
import { store } from './reduxToolkitDemo/store';
import { Project } from './reduxToolkitDemo/view/project';
import { UseEffectDemo } from './useEffectDemo';

function App() {
  return (
	<Provider store={store}>
		<div className="App">
			{/* <span
				onClick={()=>{
					Dialog.show({
						content: <div>hi</div>
					})
				}}
			>
				点击弹窗
			</span>

			<span
				onClick={()=>{
					Dialog.hide()
				}}
			>
				关闭弹窗
			</span> */}
			<Project></Project>
			<UseEffectDemo />
		</div>
	</Provider>
  );
}


export default App;
