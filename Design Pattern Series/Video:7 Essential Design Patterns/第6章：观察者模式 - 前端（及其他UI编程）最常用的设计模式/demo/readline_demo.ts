const readline = require('readline');
const fs1 = require('fs');

const rl = readline.createInterface({
  input:fs1.createReadStream('./file.txt')
});

let lineLength = 0;
rl.on('line',(line:string) => {
  lineLength++;
})

rl.on('close',()=>{
  console.log('line length',lineLength);
})