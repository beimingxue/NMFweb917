//alert('1');
const http = require('http');
//const fs = require('fs');
const querystring = require('querystring');  //查询字符串
const formidable = require('formidable');
const url = require('url');

const server = http.createServer((req,res) => {
    //console.log(req.url);

    //const MyURL = url.parse(req.url,100);
    //console.log(MyURL);

  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {

    //创建form表单
    var form = new formidable.IncomingForm();
      //用parse方法解析node.js中require请求中包含的form表单提交的数据
      form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });

      return;
   }
   

})
server.listen(3000,'127.0.0.1',function(){
	console.log('Server running at http://127.0.0.1:3000');
}) 