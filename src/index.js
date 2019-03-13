const puppeteer = require('puppeteer');
let browser = (urlList, tabNum) => {
    return new Promise((resolve, reject) => {
      console.log('开始截图')
       //执行浏览器的脚本
       let action = async () => {
           //打开浏览器
           let runbrowser = await puppeteer.launch({
            headless: false
           })
           //打开一个新的tab页
           let page = await runbrowser.newPage();
           await page.goto('http://yun.dui88.com//tuia/landPage/5127/5127_2018-05-04_11_15_24.jpeg');
           await resolve(page.screenshot({path: 'example.png'}));
       }
       action();
    }); 
}




module.exports = {
  browser
};