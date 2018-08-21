const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const CommentModel = require('../models/comment.js');
const pagination = require('../util/pagination.js');
const getCommonData = require('../util/getCommonData.js');
const router = Router();


//显示首页
router.get("/",(req,res)=>{
/*	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
	     ArticleModel.getPaginationArticles(req)
	     .then((data)=>{
	     	    //console.log(data.docs);
	     	    ArticleModel.find({},'id title click')
	     	    .sort({click:-1})
	     	    .limit(10)
	     	    .then((topArticles)=>{
	     	    	res.render('main/index',{
						userInfo:req.userInfo,
						articles:data.docs,
						page:data.page,
						list:data.list,
						pages:data.pages,
						categories:categories,
						topArticles:topArticles,
						url:'/articles'    //分页提交的地址
				    });
	     	    })
		     	
	     })
	})*/

	ArticleModel.getPaginationArticles(req)
	.then(pageData=>{
		getCommonData()
		.then(data=>{
			res.render('main/index',{
				userInfo:req.userInfo,
				articles:pageData.docs,
				page:pageData.page,
				list:pageData.list,
				pages:pageData.pages,
				categories:data.categories,
				topArticles:data.topArticles,
				url:'/articles'
			});				
		})
	})
})
//ajax请求获取文章列表的分页数据
//1.index.html(layout.html)
//2.刷新向/发送请求 app.js
//3.请求到routes(index.js)
//4.public js(index.js)  下 json有个url地址
router.get('/articles',(req,res)=>{
	//console.log('abchaha');
	/*let page = req.query.page;
	console.log(page);*/

	/*let options = {
			page: req.query.page,//需要显示的页码
			model:ArticleModel, //操作的数据模型
			query: {},//查询条件
			projection:'-__v',//投影，
			sort:{_id:-1}, //排序
			populate:[{path:'category',select:'name'},{path:'user',select:'username'}]
         }
     pagination(options)*/
    let category = req.query.category;
	let query = {};
	if(category){
		query.category = category;
	}
     ArticleModel.getPaginationArticles(req)
     .then((data)=>{
     	res.json({
     		code:'0',
     		data:data
     	})
     })
})

//显示详情页面
router.get('/view/:id',(req,res)=>{
	//console.log('aaaaaa');
	let id = req.params.id;
	//console.log(id);
/*	ArticleModel.update({_id:id},{$inc:{click:1}})   //$inc ???
	.then((raw)=>{
		ArticleModel.findById(id)
		.then((article)=>{
		   console.log(article);
	    })
	})*/
	ArticleModel.findByIdAndUpdate(id,{$inc:{click:1}},{new:true})
	.populate('category','name')
	.then((article)=>{   //详情页先拿到article
        getCommonData()   //再拿到数据
		.then(data=>{
/*             let options = {
		        page: req.query.page,//需要显示的页码
		        model:CommentModel, //操作的数据模型
		        query:{article:id}, //查询条件
		        projection:'-__v', //投影，
		        sort:{_id:-1}, //排序
		        populate:[{path:'article',select:'title'},{path:'user',select:'username'}]
		     }
		     pagination(options)*/  
		     CommentModel.getPaginationComments(req,{article:id})

            .then(pageData=>{
            	res.render('main/detail',{
					userInfo:req.userInfo,
					article:article,
					categories:data.categories,
					topArticles:data.topArticles,
					comments:pageData.docs,
					page:pageData.page,
					list:pageData.list,
					pages:pageData.pages,
					category:article.category._id.toString()
				})		
            })
		
		})
	})
})
//显示列表页面
router.get("/list/:id",(req,res)=>{
	let id = req.params.id;
	ArticleModel.getPaginationArticles(req,{category:id})
	.then(pageData=>{
		getCommonData()
		.then(data=>{
			res.render('main/list',{
				userInfo:req.userInfo,
				articles:pageData.docs,
				page:pageData.page,
				list:pageData.list,
				pages:pageData.pages,
				categories:data.categories,
				topArticles:data.topArticles,
				category:id,
				url:'/articles'
			});				
		})
	})

})



module.exports = router;
