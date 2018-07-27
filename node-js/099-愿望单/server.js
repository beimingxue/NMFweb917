

//引入模块
const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');
const url = require('url');
const WishModel = require('./WishModel.js');

//创建服务
const server = http.createServer((req,res)=>{
    console.log("req.url:::",req.url);
    let reqUrl = url.parse(req.url,true);
 
    let pathname = reqUrl.pathname;
 
    let fileName = req.url;
     
    if(pathname === '/index.html' || pathname === '/'){//显示首页
        WishModel.get((err,data)=>{
            if(!err){
                let html = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>许愿墙</title>
                                <link rel="stylesheet" href="css/index.css">
                            </head>
                            <body>
                                <div class="wall">`
                     
                    data.forEach((val)=>{
                        html += `<div class="wish" style="background: ${val.color}">
                                        <a href="javascript:;" class="close" data-id='${val.id}'></a>
                                        ${val.content}
                                 </div>`
                    });
 
                    html +=  `  </div>
                                <div class="form-box">
                                    <div>
                                        <textarea name="content" id="content" cols="30" rows="20"></textarea>
                                    </div>
                                    <div>
                                        <a href="javascript:;" class="sub-btn">许下心愿</a>
                                    </div>
                                </div>    
                            </body>
                            <script src="js/jquery.min.js"></script>
                            <script src="js/jquery.pep.js"></script>
                            <script src="js/index.js"></script>
                            </html>`;
                res.setHeader('Content-Type','text/html;charset=UTF-8');
                res.end(html);  
            }else{
                console.log(err);
            }
        });             
    }else{
        //静态资源处理
        //如果用户的请求是文件夹的话,就返回文件夹下面的index.html
        if(fileName.lastIndexOf('.') == -1){//文件夹
            fileName = fileName + '/index.html';
        }
 
        let filePath = path.normalize(__dirname + '/static/'+fileName);
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
    }
     
 
});
//设置主机名和端口
server.listen(3000,'127.0.0.1',function(){
  console.log('Server running at http://127.0.0.1:3000');
})