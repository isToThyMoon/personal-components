// import Dialog from  './dialog/Dialog';
import { UseEffectDemo } from './useEffectDemo';

function App() {
  return (
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
		<UseEffectDemo />
    </div>
  );
}


export default App;
