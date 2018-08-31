import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

//用fromJS包装一个immutable对象,loading状态
//loading={this.props.isFetching}

const defaultState = fromJS({
	isFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[]
})

export default (state=defaultState,action)=>{
	if(action.type === types.PAGE_REQUEST){
		return state.set('isFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isFetching',false)
	}

    return state;
}