const mongoose = require('mongoose');
//console.log('aaaaaa');
const CategorySchema = new mongoose.Schema({
  name:{
    type:String
  },
  pid:{
    type:String
  },
  order:{
    type:Number,
    default:0
  }

},{
  timestamps:true
});




const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;