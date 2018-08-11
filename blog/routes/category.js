const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js');
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
//显示分类管理页面
router.get("/",(req,res)=>{
     let options = {
			page: req.query.page,//需要显示的页码
			model:CategoryModel, //操作的数据模型
			query: {},//查询条件
			projection:'_id name order',//投影，
			sort:{order:1} //排序
         }
     pagination(options)
     .then((data)=>{
     	res.render('admin/category-list',{
			userInfo:req.userInfo,
			categories:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/category'
		});
     })
    /*CategoryModel.find({})
    .then((categories)=>{
    	res.render('admin/category-list',{
		   userInfo: req.userInfo,   //
		   categories:categories
	    });
    })*/
	
})
//显示新增列表
router.get("/add",(req,res)=>{
	res.render('admin/category-add',{
		userInfo: req.userInfo   //
	});
})
//
router.post("/add",(req,res)=>{   //匹配post请求的路由
	console.log(req.body);
	let body = req.body;

	CategoryModel
	.findOne({name:body.name})  //查找有此name的数据
	.then((cate)=>{
		if(cate){ //已经存在 则渲染错误页面
            //res.send('err');
            res.render('admin/error',{
				userInfo:req.userInfo,
				message:'新增分类失败,已有同名分类',	
			});
 		}else{ //如果不存在 则插入并渲染成功页面
            new CategoryModel({
            	name:body.name,
                order:body.order
            }) 
            .save()
            .then((newCate)=>{
            	if(newCate){ 
            		//res.send('ok');
            		res.render('admin/success',{
            			userInfo:req.userInfo,
            			message:'新增分类成功',
            			url:'/category'  //传入dizhi
            		});

            	}
            })
            //exception  e 异常 变量名随意 catch捕获异常 
            .catch((e)=>{ //如果插入失败(即发生异常)则渲染错误页面 
            		//res.send('err...');
            		res.render('admin/error',{
						userInfo:req.userInfo,
						message:'新增分类失败，数据库操作失败',
					});
            	})
		}
	})
})
//显示编辑页面
router.get("/edit/:id",(req,res)=>{
	let id = req.params.id;
	
	CategoryModel.findById(id)
	.then((category)=>{
		res.render('admin/category-add-edit',{
			userInfo:req.userInfo,
			category:category
		});		
	});
});

//处理编辑请求
router.post('/edit',(req,res)=>{
	let body = req.body;
	CategoryModel.findOne({name:body.name})
	.then((category)=>{
		if(category && category.order == body.order ){
	 		res.render('admin/error',{
				userInfo:req.userInfo,
				message:'编辑分类失败,已有同名分类'
			})			
		}else{
			CategoryModel.update({_id:body.id},{name:body.name,order:body.order},(err,raw)=>{
				if(!err){
					res.render('admin/success',{
						userInfo:req.userInfo,
						message:'修改分类成功',
						url:'/category'
					})					
				}else{
			 		res.render('admin/error',{
						userInfo:req.userInfo,
						message:'修改分类失败,数据库操作失败'
					})					
				}
			})
		}
	})

})
//处理删除
router.get("/delete/:id",(req,res)=>{
	let id = req.params.id;
	
	CategoryModel.remove({_id:id},(err,raw)=>{
		if(!err){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'删除分类成功',
				url:'/category'
			})				
		}else{
	 		res.render('admin/error',{
				userInfo:req.userInfo,
				message:'删除分类失败,数据库操作失败'
			})				
		}		
	})

});

module.exports = router;
