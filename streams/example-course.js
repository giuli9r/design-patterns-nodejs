const fs = require('fs');
const readLine = require('node:readline');
const path = require('path');
const { Transform, pipeline } = require('stream');

const readStream = fs.createReadStream(path.join(__dirname, './contenido.txt'), 'utf-8');
const writeStream = fs.createWriteStream(path.join(__dirname, 'linesOutputEg1.txt'), 'utf-8');

const rl = readLine.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

const processLineByLine = new Transform({
    transform(chunk, encoding, callback) {
        const newLine = `${chunk.toString().toUpperCase()} \n`;
        callback(null, newLine);
    }
})

console.time('lineByLineTransformExample');
pipeline(
    rl, 
    processLineByLine, 
    writeStream,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Pipeline completed');
        }
    }
);
console.timeEnd('lineByLineTransformExample');