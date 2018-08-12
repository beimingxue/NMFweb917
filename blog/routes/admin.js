const Router = require('express').Router;
const UserModel = require('../models/user.js');
const router = Router();
const pagination = require('../util/pagination.js');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' })
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
	res.render('admin/index',{
		userInfo: req.userInfo   //
	});
})

//显示用户列表
router.get("/users",(req,res)=>{
	//获取所有用户信息，分配给模板
	/*let page = req.query.page || 1;

	if(page <= 0){
		page = 1;
	}*/
	// console.log('11::',page);
	/*
	  分页(显示两条)
      limit(2);

      skip 跳过多少条
      1  0
      2  2
      3  4

      综上发现规律
      (page-1)*limit = skip
	*/ 
	//let limit = 2;
    
    /*UserModel.estimatedDocumentCount({})
     .then((count) =>{
    	//console.log(count);
    	//拿到总条数 计算总页数
    	   //向上取整
    	   let pages = Math.ceil(count / limit);
    	   if(page > pages){
    	   	  page = pages;
    	   }
    	   //list数组
           let list = [];
           for(var i=1; i<=pages; i++){
           	  list.push(i);
           }
    	   	let skip = 	(page-1)*limit;
	        UserModel.find({},'_id username isAdmin')
	          .skip(skip)
	          .limit(limit)
	          .then((users) =>{
				//console.log(users);
				res.render('admin/user-list',{
				   userInfo: req.userInfo,
				   users:users,
				   page:page*1,
				   list:list
			    });
			})
     })*/
         let options = {
			page: req.query.page,//需要显示的页码
			model:UserModel, //操作的数据模型
			query: {},//查询条件
			projection:'_id username isAdmin',//投影，
			sort:{_id:-1} //排序
         }
         pagination(options)
         .then((data)=>{
         	res.render('admin/user-list',{
				userInfo:req.userInfo,
				users:data.docs,
				page:data.page,
				list:data.list,
				pages:data.pages,
				url:'/admin/users'
			});
         })
	
})

router.post('/uploadImages',upload.single('upload'),(req,res)=>{
	//console.log('upload img:::',req.body);
	let path = "/uploads/"+req.file.filename;
	res.json({
		uploaded:true,
        url:path
	})
})


module.exports = router;
