const mongoose = require('mongoose');
//console.log(mongoose);
const UserModel = require('./models/user.js');
const BlogModel = require('./models/blog.js');

const moment = require('moment');
//console.log('001:',moment);

//连接数据库
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', (err)=>{
  //throw 'DB error'
  throw err
});
db.once('open',()=>{
	console.log('db connected ok...');

 /* UserModel.insertMany({
    name: 'Tom',
    age: '18',
    sex: 'female',
    locked: false,
    frends: ['nmf','amy']
  },(err,docs)=>{
     if(!err){
        console.log(docs);
     }else{
        console.log('inser data error',err);
     }
  })*/

  UserModel.findById('5b62cd66026e2131ac26e641',(err,doc)=>{
     if(!err){
         console.log(doc.createAt);
         let date = new Date(doc.createAt);
         console.log(date);
     }else{

     }
  })
    


});



