const Router = require('express').Router;

const router = Router();
//console.log('dh::',router);
//权限控制
router.use((req,res,next) =>{
	//console.log('sadasf');
   if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>');
	}
})
//显示管理员首页
router.get("/",(req,res)=>{
	//res.send('admin');
	//渲染
	//console.log('ac');
	res.render('admin/index');
})


module.exports = router;
