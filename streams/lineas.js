const fs = require('node:fs');
const readline = require('node:readline');

async function leerLineas () {
    try {
        const fileStream = fs.createReadStream('contenido.txt', 'utf8');
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // for await (const linea of rl ) {
        //     console.log(`Linea leida: ${linea}`);
        // }

        rl.on('line', (line) => {
            console.log(`Received: ${line}`);
        });

    } catch (error) {
        console.error('Error al leer el archivo:', error);
        throw error;
    }
}

console.time('leerLineas');
leerLineas().catch((error) => {
    console.error('Error en la ejecucion de leerLineas:', error);
});
console.timeEnd('leerLineas');