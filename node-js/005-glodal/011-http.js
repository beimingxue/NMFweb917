const http = require('http');
//console.log(http);

const server = http.createServer((req,res) => {
    res.write('aa');
    res.end('ad');
});
//console.log(server);
server.listen(3000,'127.0.0.1',function(){
	console.log('Server running at http://127.0.0.1:3000');
})