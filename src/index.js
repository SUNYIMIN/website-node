const puppeteer = require('puppeteer');
const url = 'https://movie.douban.com/tv/#!type=tv&tag=%E7%BB%BC%E8%89%BA&sort=recommend&page_limit=20&page_start=0';
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
 })
}
let browser = async () => {
        console.log('start view brower page');
        //运行浏览器
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            dumpio: false
        })
    
        //打开新的tab
        const page = await browser.newPage();
    
        //输入地址 等待页面完全加载
        await page.goto(url, {
            waitUntil: "networkidle2"
        })
    
        await sleep(3000)
    
        await page.waitForSelector('.more');
    
        for(var i = 0;i < 1; i++) {
           await sleep(3000);
           await page.click('.more');
        }
        const result = await page.evaluate(() => {
            let $ = window.$;
            let items = $('.list a')
            let list = [];
            if(items.length > 1) {
               items.each((index, item) => {
                  let it = $(item);
                  let imgUrl = it.find('img').attr('src');
                  let title = it.find('p').text();
                  let score = it.find('strong').text();
                  list.push({
                   imgUrl,
                   title,
                   score
                  })
               })
            }
            return list
        })
        await browser.close();
        return result;   
     
         }


module.exports = {
  browser
};