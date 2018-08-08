//路由  后端注册逻辑
const Router = require('express').Router;
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js')

const router = Router();
//console.log('1::',router);
router.post("/register",(req,res)=>{
	console.log('req::',req.body);  //body => username password

	let body = req.body;  //将body放入数据库中
	//定义返回数据
	let result = {
		code:0, //0注册成功 非0失败
		message:''
	}
	UserModel
	.findOne({username:body.username}) //判断 数据库中 是否是传进的数据
	.then((user) =>{
		if(user){//用户已经存在
           result.code = 10;
           result.message = '用户已存在'
           res.json(result);
           //console.log(result);
		}else{ //没有用户 则插入数据到数据库
            new UserModel({
            	username: body.username,
            	password: hmac(body.password)
            	//password: hmac(body.password)
            })
            .save((err,newUser)=>{
            	if(!err){ //插入成功
                      res.json(result);
            	}else{
                     result.code = 10;
                     result.message = '注册失败'
                     res.json(result);
            	}
            })
		} 
	})

})
//用户登录
router.post('/login',(req,res)=>{
	let body = req.body;
    //定义返回数据
    let result = {
    	code:0,
        message:''
    }
    UserModel
    .findOne({username:body.username,password:hamc(body.password)})
    .then((user)=>{
       if(user){ //已经有该用户
           //result.code = 10;
           //result.message = '用户已存在'
           result.data = {
             _id:user._id,
             username:user.username,
             isAdmin:user.isAdmin
           }
           res.json(result);
       }else{
           result.code = 10;
           result.message = '用户名和密码错误'
           res.json(result);
       }
    })

    
})



module.exports = router;
