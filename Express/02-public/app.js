const express = require('express');
//console.log(express);
const app = express();
//console.log(app);
app.get('/',function(req,res){
	res.send('<h1>hello 你好</h1>')
})



app.listen(3000,()=>{
	console.log('Server running at http://127.0.0.1:3000');
})