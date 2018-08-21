const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlogSchema = new mongoose.Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'Person'
	},
	title: String,
	fans: [{
		type: Schema.Types.ObjectId,
		ref: 'Person'
	}]
});



const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;	 


