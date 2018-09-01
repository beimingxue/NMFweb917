import axios from 'axios';

import * as types from './actionTypes.js';
import { ADD_CATEGORY,GET_CATEGORIES } from 'api';
//message 错误提示
import { message } from 'antd';
import { request,setUserName } from 'util';

const getAddRequstAction = ()=>{
  return {
    type:types.ADD_REQUEST
  }
}

const getAddDoneAction = ()=>{
  return {
    type:types.ADD_DONE
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
export const getAddAction = (values)=>{
	return (dispatch)=>{
		  dispatch(getAddRequstAction());
      request({
        method: 'post',
        url: ADD_CATEGORY,
        data: values  
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
          dispatch(getAddDoneAction());

      })
      .catch(function(err){
        message.error('网络错误,请稍后再试')
        dispatch(getAddDoneAction());
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