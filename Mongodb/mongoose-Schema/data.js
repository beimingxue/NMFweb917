const mongoose = require('mongoose');
//console.log(mongoose);

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

 




});