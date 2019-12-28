const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(cors()).use(router.routes()).use(router.allowedMethods());

app.listen(4000, "0.0.0.0", () => {
   console.log('test server is listening to port 4000')
});
