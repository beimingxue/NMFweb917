//alert('1');
const http = require('http');
const fs = require('fs');
const url = require('url');
//console.log(url);
//console.log(http);
const server = http.createServer((req,res) => {
    //res.write('aa');
    //req 可读流 
	//res 可写流
	
	let pathName = req.url; 
	console.log(':::',req.url);
    if(pathName === '/index.html'){
       //indexname
       fs.readFile('./index.html',(err,data) => {
       	  if(!err){
       	  	res.setHeader('Content-Type', 'text/html;charset=UTF-8');
       	    res.write(data);
       	    res.end('abc');
       	  }else{
            res.setHeader('Content-Type', 'text/html;charset=UTF-8'); 
       	    res.end('<h1>出错啦</h1>');
       	  }
       })
    }else if(pathName === '/list.html'){
       //listname
       fs.readFile('./list.html',(err,data) => {
       	  if(!err){
       	  	res.setHeader('Content-Type', 'text/html;charset=UTF-8');
       	    res.write(data);
       	    res.end('bbb');
       	  }else{
            res.setHeader('Content-Type', 'text/html;charset=UTF-8'); 
       	    res.end('<h1>出错啦</h1>');
       	  }
       })
    }else{
       //不存在
       res.setHeader('Content-Type', 'text/html;charset=UTF-8'); 
       res.end('<h1>*****</h1>');
    }

   	//res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    //res.end('hello word');
});
//console.log(server);
server.listen(3000,'127.0.0.1',function(){
	console.log('Server running at http://127.0.0.1:3000');
})