const fs = require("node:fs");
const readLine = require("node:readline");
const { Transform, pipeline } = require("node:stream");

const toUpperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(`${chunk.toString().toUpperCase()}\n`);
    callback();
  },
});

const fileStream = fs.createReadStream("./contenido.txt", "utf8");

const rl = readLine.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const outputFile = fs.createWriteStream("./contenido-uppercase-output.txt");

console.time('lineByLineTransformExample2');
pipeline(
  rl, // Lee las lineas del archivo
  toUpperCase, // Transforma el texto a mayúsculas
  outputFile, // Escribe las lineas en un nuevo archivo
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
console.timeEnd('lineByLineTransformExample2');