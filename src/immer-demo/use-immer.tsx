/*
 * @Author: 王荣
 * @Date: 2022-02-26 17:16:07
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-28 11:18:19
 * @Description: useImmer hook 使用demo
 */

import { useImmer } from  'use-immer'


export default function UseImmer() {

	const [person, setPerson] = useImmer({
		name: "Sally",
		salary: '3000'
	  });
	  function setName(name) {
		setPerson(draft => {
		  draft.name = name;
		});
	  }
	
	  function becomeRicher() {
		setPerson(draft => {
		  draft.salary += '$￥';
		});
	  }
	  return (
		<div className="App">
		  <h1>
			{person.name} ({person.salary})
		  </h1>
		  <input
			onChange={e => {
			  setName(e.target.value);
			}}
			value={person.name}
		  />
		  <br />
		  <button onClick={becomeRicher}>变富</button>
		</div>
	  );
}