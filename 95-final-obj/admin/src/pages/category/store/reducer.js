import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

//用fromJS包装一个immutable对象,loading状态
//loading={this.props.isFetching}

const defaultState = fromJS({
	isAddFetching:false,
	levelOneCategories:[]
})

export default (state=defaultState,action)=>{
	if(action.type === types.ADD_REQUEST){
		return state.set('isAddFetching',true)
	}

	if(action.type === types.ADD_DONE){
		return state.set('isAddFetching',false)
	}
	if(action.type === types.SET_LEVEL_ONE_CATEGORIES){
		return state.set('levelOneCategories',fromJS(action.payload))
	}

    return state;
}