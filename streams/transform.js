const { error } = require('node:console');
const fs = require('node:fs');
const { Transform, pipeline } = require('node:stream');

const toUpperCase = new Transform({
    transform(chukn, encoding, callback) {
        this.push(chukn.toString().toUpperCase());
        callback();
    }
});

pipeline(
    fs.createReadStream('input.txt', 'utf8'),
    toUpperCase,
    fs.createWriteStream('output.txt'),
    (error) => {
        if(error) {
            console.error('Pipeline failed:', error);
        }
    }
);
