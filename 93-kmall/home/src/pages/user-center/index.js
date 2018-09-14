require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
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
			password:$.trim($('[name="password"]').val())
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
		result.status = true;
		return result;

	}
}

$(function(){
	page.init();
})