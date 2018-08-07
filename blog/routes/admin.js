const Router = require('express').Router;

const router = Router();

//权限控制
router.use((req,res,next) =>{
   
})
router.get("/",(req,res)=>{
	//res.send('main/index');
	res.render('admin/index');
})


module.exports = router;
