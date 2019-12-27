const Router = require('koa-router');
const whitelist = require('./whitelist');

const api = new Router();

api.use('/whitelist', whitelist.routes());

module.exports = api;