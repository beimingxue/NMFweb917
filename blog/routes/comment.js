//路由  后端注册逻辑
const Router = require('express').Router;
const CommentModel = require('../models/comment.js');
  
const router = Router();

//console.log('1::',router);

//添加评论
router.post("/add",(req,res)=>{
    	//console.log('req::',req.body);  //body => id content

    	let body = req.body;  //将body放入数据库中
      console.log(body);
      new CommentModel({
         article:body.id,
         user:req.userInfo._id,
         content:body.content
      })
      .save()
      .then(comment=>{
        CommentModel.getPaginationComments(req,{article:body.id})
        .then(data=>{
            res.json({
              code:0,
              data:data
            });     
        })
      })


})
router.get('/list',(req,res)=>{
  let article = req.query.id;
  let query = {};
  if(article){
    query.article = article;
  }
  CommentModel.getPaginationComments(req,query)
  .then((data)=>{
    res.json({
      code:'0',
      data:data
    })
  })
})

module.exports = router;
