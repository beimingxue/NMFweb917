import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	parentCategoryId:'',
	categoryId:'',
	images:'',
	detail:'',
	categoryIdValidateStatus:'',
	categoryIdHelp:'',
	isPageFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[],
	isSaveFetching:false,
	
	levelOneCategories:[],
	updateModalVisible:false,
	updateId:'',
	updateName:''		
})

export default (state=defaultState,action)=>{

	if(action.type === types.SET_CATEGORY){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryIdValidateStatus:'',
			categoryIdHelp:'',				
		})
	}
	if(action.type === types.SET_IMAGES){
		return state.set('images',action.payload)
	}
	if(action.type === types.SET_DETAIL){
		return state.set('detail',action.payload)
	}

	if(action.type === types.SET_CATEGORY_ERROR){
		return state.merge({
			categoryIdValidateStatus:'error',
			categoryIdHelp:'请选择所属分类',			
		})
	}
	

	if(action.type === types.SAVE_REQUEST){
		return state.set('isSaveFetching',true)
	}

	if(action.type === types.SAVE_DONE){
		return state.set('isSaveFetching',false)
	}
	if(action.type === types.SET_LEVEL_ONE_CATEGORIES){
		return state.set('levelOneCategories',fromJS(action.payload))
	}	
	
	if(action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}

	if(action.type === types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}

	if(action.type === types.SHOW_UPDATE_MODAL){
		return state.merge({
			updateModalVisible:true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName,
		})		
	}
	if(action.type === types.CLOSE_UPDATE_MODAL){
		return state.set('updateModalVisible',false);
	}
	if(action.type === types.CHANGE_NAME){
		return state.set('updateName',action.payload)
	}

	return state;
}