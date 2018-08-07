//引入模块
//const http = require('http');
const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//console.log(express);

const app = express();
/*连接数据库*/
mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	throw err
});

db.once('open',()=>{
	console.log('DB connected....');
});
/*连接数据库end*/

//设置swig页面不缓存
swig.setDefaults({
	cache:false
})

//1.配置应用模板
  //模板名称(扩展名) + 解析方法
app.engine('html',swig.renderFile);

//2.配置模板的存放目录
app.set('views','./views/main');

//3.注册模板引擎
app.set('view engine','html');
app.get('/',(req,res)=>{
	//4.渲染模板
	res.render('index',{
		title:'blog',
		content: 'haha'

	})
});

//托管静态文件
app.use(express.static('public'));  //设置静态文件目录
//app.use('/static',express.static('public'));


/*//服务
const server = http.createServer((req,res)=>{
})
*/
//处理路由的中间件

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//处理路由
app.use('/',require('./routes/index.js'));
app.use('/user',require('./routes/user.js'));

//接收
app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})