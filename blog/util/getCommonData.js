/*
options = {
	page: //需要显示的页码
	model: //操作的数据模型
	query: //查询条件
	projection: //投影，
	sort: //排序
}
*/
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');

let getCommonData = (options)=>{

	return new Promise((resolve,reject)=>{
       CategoryModel.find({},'id name')
         .sort({order:1})
         .then((categories)=>{  //获取分类
         	ArticleModel.find({},'id title click')
         	.sort({click:-1})
         	.limit(7)
         	.then((topArticles)=>{
         		resolve({
         			categories:categories,
					topArticles:topArticles
         		})
         	})
        })
	})	
}

module.exports = getCommonData;