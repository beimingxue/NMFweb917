const mongoose = require('mongoose');
//console.log(mongoose);
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
      id: Schema.Types.ObjectId,
      name: String,
      age: Number,
      stories: [{
        type:Schema.Types.ObjectId,
        ref:'Story'
      }]
 }); 

var author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});


const UserModel = mongoose.model('User',UserSchema);




//由模块系统创建 写好模块接口  声明这个模块对外暴漏的内容
module.exports = UserModel;








