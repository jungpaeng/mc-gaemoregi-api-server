const Router = require('koa-router');
const koaBody  = require('koa-body');

const whitelistCtrl = require('./whitelist.controller');

const whitelist = new Router();

whitelist.get('/', whitelistCtrl.list);
whitelist.post('/', koaBody(), whitelistCtrl.create);
whitelist.del('/:id', whitelistCtrl.delete);

module.exports = whitelist;