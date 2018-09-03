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
module.exports = router;