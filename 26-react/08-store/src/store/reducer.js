//手册

import { CHANGE_VALUE,ADD_ITEM,DELETE_ITEM } from './actionTypes.js';

const defaultState = {
    value:'haha#',
    list:['aaa!!!$$$','bbb!!!$$$$']
}


//函数
export default (state=defaultState,action)=>{
	if(action.type == CHANGE_VALUE){
		//深copy 不管这个对象原来的构造函数是什么 深copy之后都会变成对象
		const newstate = JSON.parse(JSON.stringify(state));
        newstate.value = action.payload;
        return newstate;
	}
	if(action.type == ADD_ITEM){
		const newstate = JSON.parse(JSON.stringify(state));
		newstate.list.push(state.value);
		newstate.value = '';
		return newstate;
	}
	if(action.type == DELETE_ITEM){
		const newstate = JSON.parse(JSON.stringify(state));
		newstate.list.splice(action.payload,1);
		//newstate.value = '';
		return newstate;
	}
	return state;
};