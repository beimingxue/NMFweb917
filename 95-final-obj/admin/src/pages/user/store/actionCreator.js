import axios from 'axios';

import * as types from './actionTypes.js';
import { GET_USERS } from 'api';
//message 错误提示
import { message } from 'antd';
import { request } from 'util';

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

export const getPageAction = (page)=>{
	return (dispatch)=>{
      // Send a POST request
      dispatch(getPageRequstAction());
      request({
        method: 'get',
        url: GET_USERS,
        data: {
          page:page
        } 
      })
      .then(function(result){
          //let data = result.data;
          console.log(result.data.username)
          
          if(result.code == 0){
              dispatch()
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