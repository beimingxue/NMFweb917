import React,{ Component } from 'react';

import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Checkbox,message} from 'antd';

import axios from 'axios';
import { actionCreator } from './store';
import './index.css';
const FormItem = Form.Item;

class NormalLoginForm extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
       isFetching:false
    }
	}
	handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         //1.调用下面的mapStateToProps方法里面的handleLogin函数
         //2.传参
          this.props.handleLogin(values);
       } 
       else{
        console.log(err)
       }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
     <div className='Login'>
      <Form  className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' },{pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3-6个字符'}],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {                    
            rules: [{ required: true, message: '请输入密码!' },{pattern:/^[a-z|\d]{3,6}$/,message:'密码为3-6个字符'}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button 
              type="primary" 
              onClick={this.handleSubmit} 
              className="login-form-button"
              loading={this.props.isFetching}
              >
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
    );
  }
}

//redux管理登录数据 将数据传输 
const mapStateToProps = (state)=>{
   return{
     isFetching:state.get('login').get('isFetching')
   }
}
//方法(action实现业务逻辑)  dispatch 给 action 再给store
const mapDispatchToProps = (dispatch)=>{
   return{
     handleLogin:(values)=>{
         const action = actionCreator.getLoginAction(values);
         dispatch(action);
     }
   }
}

const Login = Form.create()(NormalLoginForm);

export default connect(mapStateToProps,mapDispatchToProps)(Login);