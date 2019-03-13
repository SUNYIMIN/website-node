const fs = require('fs');
function readFile(path){
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
       if(err) {
        reject(err)
       } else {
        resolve(data)
       }
    })
  })
}

function writeFile(path, data) {
   return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err, data) => {
       if(err) {
         reject(false)
       } else {
         resolve(true)
       }
    })
   })
}
module.exports = {
  readFile,
  writeFile
}