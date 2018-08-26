import axios from 'axios';

import * as types from './actionTypes.js';
import { SERVER_LOGIN } from 'api';
//message 错误提示
import { message } from 'antd';
import { request,setUserName } from 'util';

const getLoginRequstAction = ()=>{
  return {
    type:types.LOGIN_REQUEST
  }
}

const getLoginDoneAction = ()=>{
  return {
    type:types.LOGIN_DONE
  }
}

export const getLoginAction = (values)=>{
	return (dispatch)=>{
		  /*this.state = {
        isFetching:true
      }*/
      // Send a POST request
      request({
        method: 'post',
        url: SERVER_LOGIN,
        data: values  
      })
      .then(function(result){
          //let data = result.data;
          console.log(result.data.username)
          //登录成功
          if(result.code == 0){
            setUserName(result.data.username)
             //window.localStorage.setItem('username',result.data.username)
              window.location.href = '/'
          }else if(result.code == 10){
              message.error(result.message);
          }
          /*this.state = {
             isFetching:true
          }*/
      })
      .catch(function(err){
        message.error('网络错误,请稍后再试')
        /*this.state = {
           isFetching:true
        }*/
      })
	 }
}