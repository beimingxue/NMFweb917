const Router = require('express').Router;

const router = Router();

router.get("/",(req,res)=>{
	res.send('main/index');
})


module.exports = router;
