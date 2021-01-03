const config = require('./utils/config');
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const mongo = require('mongoose');
const cors = require('cors');
const middleware = require('./utils/middleware');

logger.info('Connecting to ', config.MONGO_URI);

mongo.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		logger.info('Connected to MongoDB');
	})
	.catch(err => {
		logger.error('Error connecting to MongoDB: ', err.message);
	});
	
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;