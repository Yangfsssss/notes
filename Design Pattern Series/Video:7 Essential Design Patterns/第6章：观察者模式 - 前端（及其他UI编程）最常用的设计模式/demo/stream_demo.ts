// export {};
module.exports = {};
// import fs from 'fs';
const fs = require('fs');
const readStream = fs.createReadStream('./file.txt');

let totalLength = 0;

readStream.on('data', (chunk:Buffer) => {
  const currentLength = chunk.toString().length;

  console.log('current length: ', currentLength);

  totalLength += currentLength;
});

readStream.on('end', () => {
  console.log(totalLength);
});
