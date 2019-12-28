const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

const PORT = 8800;

router.use('/api', api.routes());

app.use(cors()).use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
   console.log(`Gaemoregi API server is listening to port on 8800`)
});
