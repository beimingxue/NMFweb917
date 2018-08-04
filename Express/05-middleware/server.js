//引入模块
const http = const('http');

//中间件实现原理
function express(){
   let fns = [];
   let app = function(req,res){
       let i = 1;
       function next(){
       	  let fn = fns[i++],
       	  if(!fn){
              return;
       	  }
       	  fn(req,res,next);
       }
       next();
   }
   app.use = function(){
       fns.push(fn);
   }
 
   return app;

}


const app = express();

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

//创建服务	
const sever = http.createServer(app);

//接收
app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})