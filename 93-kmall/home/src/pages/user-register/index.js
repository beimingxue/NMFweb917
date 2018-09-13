require('./index.css')
require('pages/common/logo/index.css');
require('pages/common/footer/index.css');
require('pages/common/nav/index.css');
console.log('user login');

var _util = require('util');
var _user = require('service/user');
//$('body').html('user-login')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')			
	}
}
//登录页面逻辑
var page = {
	init:function(){
		this.bindEvent();
	},
	//绑定事件
	bindEvent:function(){
		var _this = this;
		//console.log(_this)
		$('[name="username"]').on('blur',function(){
			var username = $(this).val();
			if(!_util.validate(username,'require')){
				return;
			}
			if(!_util.validate(username,'username')){
				return;
			}			
			_user.checkUsername(username,function(){
				//该用户名没有注册
				formErr.hide();
			},function(message){
				//该用户名已经注册
				formErr.show(message);
			})
		})

		$('#btn-submit').on('click',function(){
			_this.submit();
		})
		
		$('input').on('keyup',function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})		
	},
	submit:function(){
		//alert('aa');
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val())
		}
		console.log(formData)
		//2.验证数据
		var validateResult =  this.validate(formData);
		console.log('valid',validateResult);
		//3.提交
		//验证通过
		if(validateResult.status){
			console.log('success')
			formErr.hide();	
			//发送登录请求	
			_user.login(formData,function(result){
				console.log('isget?')
				//window.location.href = '/';
				_util.goHome();
				//window.location.href = _util.getParamFromUrl('redirect') || './index.html';
			},function(msg){
				console.log('???')
				formErr.show(msg);
			})
		}
		//验证失败
		else{
			console.log('error')
			formErr.show(validateResult.msg);
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//验证用户名不能为空
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		//验证用户名格式
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式错误';
			return result;
		}
		//验证用户名不能为空
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//验证密码格式
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式错误';
			return result;
		}
		//
		if(!_util.validate(formData.repassword,'require')){
			result.msg = '请再次输入密码';
			return result;
		}
		//
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致';
			return result;
		}
		//验证手机号不能为空
		if(!_util.validate(formData.phone,'require')){
			result.msg = '手机号不能为空';
			return result;
		}
		//手机号格式不正确
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		//验证邮箱不能为空
		if(!_util.validate(formData.email,'require')){
			result.msg = '邮箱不能为空';
			return result;
		}
		//邮箱格式不正确
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}		
		result.status = true;
		return result;

	}
}

$(function(){
	page.init();
})