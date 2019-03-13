const axios = require('axios');
const path = require('path');
const {readFile} = require('../util/fs.js');

let init = async () => {
    const data = await readFile(path.join(__dirname, './urlData.json'));
    const urlList = JSON.parse(data).data.list;
    urlList.length = 1;
    axios.post('http://127.0.0.1:5000/urldata', {
      source: 'test',
      urlList
    }).then((res) => {
      console.log('res', res);
    }).catch((err) => {
      console.log('err', err);
    })
}

init();