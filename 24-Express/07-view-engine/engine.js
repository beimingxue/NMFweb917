//引入模块
const express = require('express');
const swig = require('swig');
//console.log(express);

const app = express();

//设置swig页面不缓存
swig.setDefaults({
	cache:false
})

//1.配置应用模板
//模板名称(扩展名) + 解析方法
app.engine('html',swig.renderFile);

//2.配置模板的存放目录
app.set('views','./views');

//3.注册模板引擎
app.set('view engine','html');
app.get('/',(req,res)=>{
	//4.渲染模板
	res.render('index',{
		title:'kuazhu',
		content: 'haha'

	})
})

//接收
app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})