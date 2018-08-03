const mongoose = requier('mongoose');

const BlogSchema = new mongoose.Schema({
	author: String,
	title: String,
	content: String
});


const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;	 


