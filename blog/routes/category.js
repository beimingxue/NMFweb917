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
//显示管理页面
router.get("/",(req,res)=>{
    //console.log('nmf');
	res.render('admin/category-list',{
		userInfo: req.userInfo   //
	});
})
//显示新增列表
router.get("/add",(req,res)=>{
	res.render('admin/category-add',{
		userInfo: req.userInfo   //
	});
})
//
router.post("/add",(req,res)=>{
	console.log(req.body);
})




module.exports = router;
