//

var http = require('http');

var server = http.creatServer(function(req,res){
    res.end('hello nodejs');
})

server.listen(3000,'127.0.0.1',function(){
	console.log('Server running at http://127.0.0.1:3000');
})