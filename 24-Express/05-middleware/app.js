/*
* @Author: TomChen
* @Date:   2018-08-03 15:20:15
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-03 17:18:55
*/
const express = require('express');
// const userRouter = require('./routes/user.js')


const app = express();

app.use(express.static('public'));

app.use((req,res,next)=>{
	console.log('before A...');
	next();
	console.log('after A...')
});
app.use((req,res,next)=>{
	console.log('before B...');
	next();
	console.log('after B...')
})
app.use((req,res,next)=>{
	console.log('before C...');
	next();
	console.log('after C...')
})
app.get('/',function(req,res){
	console.log('hello');
	res.end('hello');
})

//before(A B C)  hello  after(C B A)





//app.use('/user',require('./routes/user.js'));
//app.use('/blog',require('./routes/blog.js'));

app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})