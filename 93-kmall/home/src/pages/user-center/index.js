require('./index.css');
require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('pages/common/side');
console.log('user login');

var _util = require('util');
var _user = require('service/user');
var _side = require('pages/common/side');
var tpl = require('./index.tpl');

//登录页面逻辑
var page = {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			var html = _util.render(tpl,userInfo);
			$('.side-content').html(html)
		})
	}
	
	
}

$(function(){
	page.init();
})