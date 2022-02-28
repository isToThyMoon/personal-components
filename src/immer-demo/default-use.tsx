/*
 * @Author: 王荣
 * @Date: 2022-02-26 17:17:23
 * @LastEditors: 王荣
 * @LastEditTime: 2022-02-28 11:18:36
 * @Description: immer默认使用方式 demo
 */
import { enablePatches } from 'immer';
import produce, { applyPatches, Patch } from "immer";

enablePatches();

interface IInitialState {
	x?: number,
	y?: number,
}

let state: IInitialState = {
	x: 1,
}

let replaces: Patch[] = [];
let inverseReplaces: Patch[] = [];

state = produce(
	state,
	draft => {
		draft.x = 2;
		draft.y = 2;
	},
	(patches, inversePatches) => { // 只运行一次 每次都记录的话每次的produce修改都要监听
		console.log('patchLisener', patches, inversePatches)
		replaces = patches.filter(patch => patch.op === 'replace');
		inverseReplaces = inversePatches.filter(patch => patch.op === 'replace');
	}

)
console.log('patch', replaces, inverseReplaces);
//op: "replace" path: ['x'] value: 2，op: "replace" path: ['x'] value: 1
console.log('state0', state); // { x: 2, y: 2 }

state = produce(state, draft => {
	draft.x = 3;
})
console.log('state1', state); // { x: 3, y: 2 }

state = applyPatches(state, replaces);
console.log('state2', state); // { x: 2, y: 2 }

state = produce(state, draft => {
	draft.x = 4;
})
console.log('state3', state); // { x: 4, y: 2 }

state = applyPatches(state, inverseReplaces);
console.log('state4', state); // { x: 1, y: 2 }


export default function Immer(){
	
	return (
		<div>
			Immer
		</div>
	)
}