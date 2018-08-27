import axios from 'axios';

import * as types from './actionTypes.js';
import { ADMIN_COUNT } from 'api';
//message 错误提示
import { message } from 'antd';
import { request,setUserName } from 'util';



const setCountAction = (payload)=>{  //payload传递过去 就是//console.log(result.data.username)
  return {
    type:types.SET_COUNT,
    payload
  }
}

export const getCountAction = ()=>{
	return (dispatch)=>{ 
      // Send a POST request
      request({
        url: ADMIN_COUNT,
      })
      .then(function(result){
          console.log('count:::',result);
          
          //登录成功
          if(result.code == 0){ //获取 更新reducer 开发数据
              dispatch(setCountAction(result.data))
          }else if(result.code == 1){
              message.error('获取统计数据失败!');
          }
        
      })
      .catch(function(err){
        message.error('获取统计数据失败,网络错误,请稍后再试!')
       
      })
	 }
}