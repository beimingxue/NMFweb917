import axios from 'axios';

import * as types from './actionTypes.js';
import { ADD_PRODUCT,GET_CATEGORIES } from 'api';
//message 错误提示
import { message } from 'antd';
import { request,setUserName } from 'util';

export const getSetCategoryAction =(parentCategoryId,categoryId)=>({
    type:types.SET_CATEGORY,
    payload:{
      parentCategoryId,
      categoryId
    }

})
export const getSetImagesAction =(fileList)=>({
    type:types.SET_IMAGES,
    payload:{
      fileList
    }

})  
export const getSetDetailAction =(value)=>({
    type:types.SET_DETAIL,
    payload:{
      value
    }

}) 


const getSaveRequstAction = ()=>{
  return {
    type:types.SAVE_REQUEST
  }
}

const getSaveDoneAction = ()=>{
  return {
    type:types.SAVE_DONE
  }
}

const setLevelOneCategories = (payload)=>{
  return {
    type:types.SET_LEVEL_ONE_CATEGORIES,
    payload
  } 
}
const getPageRequstAction = ()=>{
  return {
    type:types.PAGE_REQUEST
  }
}

const getPageDoneAction = ()=>{
  return {
    type:types.PAGE_DONE
  }
}
const getSetPageAction = (payload)=>{
  return {
    type:types.SET_PAGE,
    payload
  }
}
const setCategoryError = ()=>({
  type:types.SET_CATEGORY_ERROR
})
export const getSaveAction = (values)=>{
	return (dispatch,getState)=>{
      //console.log('aaaaaa')
      const state = getState().get('product');
      const  categoryId = state.get('categoryId');
      if(!categoryId){
      dispatch(setCategoryError())
           return;
      }
      /*if(err){
           return;
      }*/
		  dispatch(getSaveRequstAction());
      request({
        method: 'post',
        url: ADD_PRODUCT,
        data: {
            ...values,
          category:categoryId,
          images:state.get('images'),
          detail:state.get('detail')
        } 
      })
      .then(function(result){
          if(result.code == 0){
              if(result.data){//如果添加的是一级分类,重新更新一级分类
                dispatch(setLevelOneCategories(result.data))
              }
              //console.log('exc:',result);
              message.success('添加分类成功')
           }else{
             message.error(result.message)
           }
          dispatch(getSaveDoneAction());

      })
      .catch(function(err){
        message.error('网络错误,请稍后再试')
        dispatch(getSaveDoneAction());
      })
	 }
}

export const getLevelOneCategoriesAction = ()=>{
  return (dispatch)=>{
    //console.log('hahahaa');
      request({
        method: 'get',
        url: GET_CATEGORIES,
        data: {
          pid:0
        }  
      })
      .then(function(result){
          if(result.code == 0){
              //console.log('exc::::',result);
              dispatch(setLevelOneCategories(result.data));
           }else{
             message.error(result.message)
           }
      })
      .catch(function(err){
        message.error('网络错误,请稍后再试')
      })
   }
}

export const getPageAction = (pid,page)=>{
  return (dispatch)=>{
      // Send a POST request
      dispatch(getPageRequstAction());
      request({
        method: 'get',
        url: GET_CATEGORIES,
        data: {
          pid:pid,
          page:page
        } 
      })
      .then(function(result){
         // console.log(result.data.username)
          if(result.code == 0){
              dispatch(getSetPageAction())
          }else if(result.code == 10){
              message.error(result.message);
          }
           dispatch(getPageDoneAction());
      })
      .catch(function(err){
          message.error('网络错误,请稍后再试');
          dispatch(getPageDoneAction());
      })
   }
}