const mongo = require('mongoose');

const blogSchema = new mongo.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
});

blogSchema.set('toJSON', {
	transform: (doc, retObj) => {
		retObj.id = retObj._id.toString();
		delete retObj._id;
		delete retObj.__v;
	}
});

module.exports = mongo.model('Blog', blogSchema);
