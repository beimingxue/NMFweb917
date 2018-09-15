require('./index.css');
require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('pages/common/side');
console.log('user login');

var _util = require('util');
var _user = require('service/user');
var _side = require('pages/common/side');

//登录页面逻辑
var page = {
	init:function(){
		this.onload();
	},
	onload:function(){
		_side.render('user-center')
	}
	
	
}

$(function(){
	page.init();
})