console.log('Event Loop Example - Inicio del script');

// Comentar para cambiar el orden de ejecución y verificar en consola que el orden no cambia.
process.nextTick(() => {
    console.log('process.nextTick ejecutado - mikrotask');
});

setTimeout(() => {
    console.log('setTimeout callback ejecutado');
});

setImmediate(() => () => {
    console.log('setImmediate callback ejecutado');
});

const fs = require('fs');
fs.readFile(__filename, 'utf-8', (e, data) => {
    console.log('readFile callback ejecutado - poll phase - I/O callback');
});

// Descomentar para cambiar el orden de ejecución y verificar en consola que el orden no cambia.
// process.nextTick(() => {
//     console.log('process.nextTick ejecutado - mikrotask');
// });

// setTimeout(() => {
//     console.log('setTimeout callback ejecutado');
// });

console.log('Event Loop Example - Fin del script'); 
