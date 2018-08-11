const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const router = Router();


//显示首页
router.get("/",(req,res)=>{
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories:categories
		});
	})
	
})


module.exports = router;
