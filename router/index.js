const Router = require('koa-router');
const path = require('path');
const router = new Router();
const { writeFile } = require('../util/fs.js');
const { browser } = require('../src/index.js'); 

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
      ctx.body = {
        code: "200",
        dec: "备份数据成功"
      } 
      setTimeout(async () => {
        //开始截图
        // 3 打开浏览器里的3个tab
        let screenImg = await browser(urlList, 3);
        console.log('img', screenImg);
        let endTime = +new Date();
        global.Log.info('截图时间', (endTime - startTime) / 1000 + '秒');
      }, 100)
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