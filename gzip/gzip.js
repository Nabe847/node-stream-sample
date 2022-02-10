const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
    console.log('Invalid file path');
    return;
}

const zipFileName = path.basename(filePath, '.txt') + '.zip'
const zipFilePath = path.join(__dirname, zipFileName);

fs.createReadStream(filePath)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(zipFilePath))
    .on('finish', () => console.log('File successfully compressed'));
