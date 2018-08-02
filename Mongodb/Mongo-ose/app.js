const mongoose = require('mongoose');
//console.log(mongoose);
const UserModel = require('./models/user.js');
const BlogModel = require('./models/blog.js');

const moment = require('moment');

//连接数据库
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', (err)=>{
  //throw 'DB error'
  throw err
});
db.once('open',()=>{
	console.log('db connected ok...');

	//2.定义schema
	const UserSchema = new mongoose.Schema({
      name: String,
      age: Number,
      sex: String
    });
    //3.用定义好的schema生成model
    //:::model 的第一个参数会生成数据库中集合的名称，数据库中会把他变成小写加复数
    const User = mongoose.model('User',UserSchema);

    //4.用model操作数据库

    //插入
    /*const user = new User({name:'BHL',age:18,sex:'male'});
    user.save((err,doc) =>{
    	if(!err){
    		console.log(doc);
    	}else{
            console.log('save error');
    	}
    })
*/
    //查找
   /* User.find({name:'NMF'},(err,docs)=>{
       if(!err){
       	  console.log(docs.toString());
       }else{
       	  console.log('find data error:::',err);
       }
    })*/
    
    //更新
    /*User.update({name:'NMF'},{$set:{age:88}},(err,result)=>{
    	if(!err){
            console.log(result);
    	}else{
            console.log('update data error:::',err)
    	}
    })*/
    
    //删除
    /*User.remove({name:'NMF'},(err,result)=>{
    	if(!err){
            console.log(result);
    	}else{
            console.log('remove data error:::',err)
    	}
    })*/


});



