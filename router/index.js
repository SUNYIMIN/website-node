const Router = require('koa-router');
const router = new Router();

router.post('/urldata', async (ctx, next) => {
   let params = ctx.request.body;
   console.log('ssss', params);
   ctx.body = {
     code: 200
   }
})


module.exports = router;