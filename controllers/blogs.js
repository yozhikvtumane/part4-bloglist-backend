const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// app.get('/api/blogs', (request, response) => {
blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({});
		return response.json(blogs);
	} catch (err) {
		next(err);
	}
});

blogsRouter.post('/', async (request, response, next) => {
	
	const { body } = request;
	const blog = new Blog(body);
	
	try {
		const result = await blog.save();
		response.status(201).json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = blogsRouter;