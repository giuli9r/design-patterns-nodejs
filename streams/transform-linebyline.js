const fs = require('node:fs');
const { Transform, pipeline } = require('node:stream');


const lineByLineTransform = new Transform({
    transform(chunk, encoding, callback) {
        let data = this._lastLineData + chunk.toString();
        const lines = data?.split('\n') || [];
        this._lastLineData = lines?.pop(); // Save last partial line
       
        for (const line of lines) {
            // Transform each line here 
            this.push(line.toUpperCase() + '\n');
        }
        if (this._lastLineData) {
            this.push(this._lastLineData.toUpperCase() + '\n');
        }
        callback();
    }
});

console.time('lineByLineTransform');
pipeline( 
    fs.createReadStream('contenido.txt', 'utf8'),
    lineByLineTransform,
    fs.createWriteStream('linebyline-output.txt'),
    (error) => {
        if(error) {
            console.error('Pipeline failed:', error);
        }
    }
);
console.timeEnd('lineByLineTransform');