const Router = require('express').Router;
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/product-images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

const router = Router();
//console.log('category');
//权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
           code:10
 		});
	}
})

//上传商品图片
router.post("/uploadImage",upload.single('file'),(req,res)=>{
	//地址给前端 
	const filePath = 'http://127.0.0.1:3000/product-images/'+req.file.filename;
	//console.log(filePath);
    res.send(filePath);
	

})
//上传商品详情图片
router.post("/uploadDetailImage",upload.single('upload'),(req,res)=>{
	//console.log("isgetin")
	//地址给前端 
	const filePath = 'http://127.0.0.1:3000/product-images/'+req.file.filename;
	//console.log(filePath);
    //res.send(filePath);

    //返回json
    res.json({
    	"success": true,
    	"msg":'上传成功',
        "file_path":filePath
    })
	

})

//添加商品
router.post("/",(req,res)=>{
	let body = req.body;
	//console.log('body::',body)
	CategoryModel
	.findOne({name:body.name},{pid:body.pid})
	.then((cate)=>{
		if(cate){//
	 		res.json({
	 			code:1,
	 			message:"添加分类失败,分类已存在！"
	 		})
		}else{
			new CategoryModel({
				name:body.name,
				pid:body.pid
			})
			.save()
			.then((newCate)=>{
				if(newCate){//如果添加的是一级分类,返回新的一级分类= = 
					if(body.pid ==0 ){
						console.log('codedd')
						CategoryModel.find({pid:0},"_id name") 
						.then((categories)=>{
							res.json({
								code:0,
								data:categories
							})	
						})
					}else{
						console.log('save--')
						res.json({
						  code:0
					    })
					}
					
				}
			})
			.catch((e)=>{//
		 		res.json({
		 			code:1,
		 			message:"分类已存在！服务器端错误"
	 		    })
			})
		}
	})
})
module.exports = router;