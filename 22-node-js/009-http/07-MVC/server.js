/*
* @Author: TomChen
* @Date:   2018-07-26 16:08:46
* @Last Modified by:   TomChen
* @Last Modified time: 2018-07-27 17:32:58
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');
const url = require('url');
/*const WishModel = require('./Model/wish.js');*/
const querystring = require('querystring');
const swig = require('swig');

const server = http.createServer((req,res)=>{
	console.log("req.url:::",req.url); //url 地址的返回
    
    //url.parse()可以将一个完整的URL地址，分为很多部分，常用的有：host、port、pathname、path、query
	let pathname = url.parse(req.url,true).pathname;
    //console.log('0:',pathname);
	/*let pathname = reqUrl.pathname;*/

	//let fileName = req.url;
	//约定：
	//1.请求路径以 /static/开始的都是静态资源
	//            /static/css/index.css  (即后端拿到的pathname格式)
	//2.路由的请求格式: /Controller/action/arg1/arg2...
	//               /Wish/index/

	if(pathname.startsWith('/static/')){//处理静态资源  startsWith('检测开头是否为这个字符串') 调用字符串

		let filePath = path.normalize(__dirname + pathname);
		let fileExtName = path.extname(filePath);

		fs.readFile(filePath,(err,data)=>{
			if(!err){
				let mimeType = mime[fileExtName] || 'text/plain';
				res.setHeader('Content-Type', mimeType+';charset=UTF-8');
				res.end(data);
			}else{
				res.setHeader('Content-Type', 'text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('<h1>页面走丢了。。。。</h1>')
			}
		});
	}else{//处理动态路由
          console.log('1:::',pathname);
          let paths = pathname.split('/');
          //console.log(paths);
          let action = paths[2];
          let model = require('./Controller/' + paths[1]);
          model[action](); //获取Controller 内部内容
          
	  }
});
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})