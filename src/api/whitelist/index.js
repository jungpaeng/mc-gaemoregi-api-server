const Router = require('koa-router');
const whitelist = new Router();
const whitelistCtrl = require('./whitelist.controller');

whitelist.get('/', whitelistCtrl.list);

module.exports = whitelist;