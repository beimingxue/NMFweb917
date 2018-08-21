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
  BlogModel.findOne({title:'Casino Royale'},(err,doc)=>{
      if(!err){
          //doc.author = author;
          console.log(doc);
      }else{
          console.log('error');
      }
  })


});



