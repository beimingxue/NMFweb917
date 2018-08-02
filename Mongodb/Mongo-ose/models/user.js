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
        type: Date
      },
      frends:{
        type: Array
      }

  
 }); 


const UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;








