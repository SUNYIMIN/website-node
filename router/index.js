const Router = require('koa-router');
const path = require('path');
const router = new Router();
const { writeFile } = require('../util/fs.js');

router.post('/urldata', async (ctx, next) => {
   let {
    urlList
   } = ctx.request.body;
   if(!urlList || urlList.length === 0 ) {
     ctx.body = {
       code: '503',
       dec: '请求参数不存在'
     }
     return;
   }
  let startTime = +new Date();
  //先备份一份数据
  let filePath = path.join(__dirname, '../data/copydata.json');
  let iswrite = await writeFile(filePath, JSON.stringify(urlList));
  try {
    if(iswrite) {
      
    } else {
      ctx.body = {
        code: "403",
        dec: "备份数据失败"
      } 
    }
  } catch (err) {
   ctx.body = {
     code: "504",
     dec: "服务错误"
   } 
  }
})


module.exports = router;