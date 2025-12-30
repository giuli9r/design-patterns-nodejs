const fs = require('node:fs');

// // Create a readable with fs
// let data = fs.readFileSync('input.txt', 'utf8', (err, data) => {
//     if (err) throw err;
// });
// console.log('File content:', data);

// Create a readable stream
// let data = fs.createReadStream('input.txt', 'utf8');
// data.on('data' , (chunk) => {console.log('Stream chunk:\n', chunk);})
// data.on('end', () => {console.log('Stream ended');})

// Create a writable stream
// let data = fs.createReadStream('input.txt', 'utf8');
// let writeData = fs.createWriteStream('output.txt');
// data.on('data' , (chunk) => {
//     console.log('Writing chunk to output.txt');
//     writeData.write(chunk);
// })
// data.on('end', () => {
//     console.log('Finished writing to output.txt');
//     writeData.end();
// })
// writeData.on('finish', () => {
//     console.log('All data written to output.txt');
// });
// writeData.on('error', (err) => {
//     console.error('Error writing to output.txt:', err);
// });

