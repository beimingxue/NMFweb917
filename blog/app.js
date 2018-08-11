//引入模块
//const http = require('http');
const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
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
app.set('views','./views');

//3.注册模板引擎
app.set('view engine','html');
// app.get('/',(req,res)=>{
// 	//4.渲染模板
// 	res.render('index',{
// 		title:'blog',
// 		content: 'haha'

// 	})
// });

//托管静态文件
app.use(express.static('public'));  //设置静态文件目录
//app.use('/static',express.static('public'));

//设置cookie的中间件,后面所有的中间件都会有cookie
/*
app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res);
	// console.log(req.cookies.get('userInfo'))
	req.userInfo = {};

	let userInfo = req.cookies.get('userInfo');

	if(userInfo){
		try{
			req.userInfo = JSON.parse(userInfo)
		}catch(e){
		}
	}

	next();
});
*/
app.use(session({
    //设置cookie名称
    name:'blid',
    //用它来对session cookie签名，防止篡改
    secret:'dsjfkdfd',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},    
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })   
}))

app.use((req,res,next)=>{

	req.userInfo  = req.session.userInfo || {};

	next();	
});

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
app.use('/admin',require('./routes/admin.js'));
app.use('/category',require('./routes/category.js'));
app.use('/article',require('./routes/article.js'));


//接收
app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})