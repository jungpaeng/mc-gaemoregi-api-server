const Router = require('koa-router');
const whitelist = require('./whitelist');
const user = require('./user');

const api = new Router();

api.use('/whitelist', whitelist.routes());
api.use('/user', user.routes());

module.exports = api;