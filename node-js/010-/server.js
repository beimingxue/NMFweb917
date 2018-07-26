//alert('1');
//引入http模块
const http = require('http');
const fs = require('fs');



//创建服务
const server = http.createServer((req,res) => {
    //console.log(req.url);

    //const MyURL = url.parse(req.url,100);
    //console.log(MyURL);

  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
      // parse a file upload
    var form = new formidable.IncomingForm();

      form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });

      return;
   }

})
//设置主机名和端口
server.listen(3000,'127.0.0.1',function(){
	console.log('Server running at http://127.0.0.1:3000');
}) 