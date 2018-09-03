const mongoose = require('mongoose');
//console.log('aaaaaa');
const ProductSchema = new mongoose.Schema({
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




const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;