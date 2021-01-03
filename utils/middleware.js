const logger = require('./logger');
const morgan = require('morgan');

const requestLogger = morgan(function (tokens, req, res) {
	const body = JSON.stringify(req.body);
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		body === "{}" ? null : body
	].join(' ')
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (error, request, response, next) => {
	
	logger.error(error.message);
	
	const {errors} = error;
	
	if (error.name === 'CastError' && error.kind == 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' });
	}
	
	// if (error.name === 'ValidationError' && errors.number) {
	// 	return response.status(400).send({error: errors.number.properties.message});
	// }
	
	// if (error.name === 'ValidationError' && errors.name) {
	// 	return response.status(400).send({error: errors.name.properties.message});
	// }

	next(error);
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
};