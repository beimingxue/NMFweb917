const express = require('express');
//console.log(express);
const app = express();
//console.log(app);
app.get('/',function(req,res){
	res.send('get data ...')
});

app.post('/',function(req,res){
	res.send('get data ...')
});

app.put('/',function(req,res){
	res.send('get data ...')
});

app.delete('/',function(req,res){
	res.send('get data ...')
});

app.use(express.static('public'));

app.listen(3000,()=>{
	console.log('Server running at http://127.0.0.1:3000');
})