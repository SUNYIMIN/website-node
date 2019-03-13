const Koa = require('koa');
const log = require('koa-loggers');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const router = require('./router/index.js');
let app = new Koa();

let port = 5000;
// 日志
app.use(log({
  filename: path.join(
    __dirname, 
    './log',
    'server-web.log')
}))
app.use(bodyparser());
app.use(async (ctx, next) => {
   ctx.body = 'hello word';
   global.Log.info('text','测试日志');
   await next();
})
// 接口
app.use(router.routes());

app.listen(port, () => {
    console.log('-------服务启动--------');
})