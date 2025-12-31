const tareaUno = new Promise(resolve => setTimeout(() => resolve('Tarea Uno completada'), 1000));
const tareaDos = new Promise(resolve => setTimeout(() => resolve('Tarea Dos completada'), 1500));
const tareaTres = new Promise(resolve => setTimeout(() => resolve('Tarea Tres completada'), 2000));

const tarea56 = new Promise( (resolve, reject) => {
  const exito = true; // Cambia a false para simular un error
  setTimeout(() => {
      if (exito) {
          resolve('Tarea 56 completada');
      } else {
          reject('Error en Tarea 56');
      }
  }, 1200);
});

Promise.all([tareaUno, tareaDos, tareaTres, tarea56])
.then(resultados => console.log(resultados))
.catch(error => console.error(error));