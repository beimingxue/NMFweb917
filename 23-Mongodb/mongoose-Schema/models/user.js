const mongoose = require('mongoose');
//console.log(mongoose);


const UserSchema = new mongoose.Schema({
      name:{
        type: String
      },
      age:{
        type: Number
      },
      sex:{
        type: String
      },
      locked:{
        type: Boolean
      },
      createdAt:{
        type:Date,
        default:Date.now
      },
      frends:{
        type: Array
      }

  
 }); 


const UserModel = mongoose.model('User',UserSchema);

//由模块系统创建 写好模块接口  声明这个模块对外暴漏的内容
module.exports = UserModel;








