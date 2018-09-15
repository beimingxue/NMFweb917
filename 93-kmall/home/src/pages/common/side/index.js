require('./index.css');
var _util = require('util');

var Hogan = require('hogan.js');
var side ={
	list:[
		{name:'user-center',desc:'用户中心',href:'./user-center.html'},
		{name:'order-list',desc:'我的订单',href:'./order-list.html'},
		{name:'user-update-password',desc:'修改密码',href:'./user-update-password.html'},
	],
    render:function(name){
    	//console.log(name)
        var tmp = '<div>{{data}}</div>';
        var html = _util.render(tmp,{data:123});
        console.log(html)
    }
}

module.exports = side;