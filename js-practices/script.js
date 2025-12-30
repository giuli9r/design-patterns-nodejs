
// FUNCIONES DE PRIMER Y SEGUNDO ORDEN
// Una función de segundo orden es una función que toma una función como argumento y la ejecuta sincronamente.

// EJEMPLO INTRO
// function saludar(nombre) { 
//     console.log(`Hola, ${nombre}!`);
// }
// function ejecutarFuncion(fn, arg) {
//     console.log("Ejecutando la función pasada como argumento:");
//     fn(arg);
// }
// ejecutarFuncion(saludar, "Mila");

async function request(url , fn) {
    let response = await fetch (url);
    let data = await response.json();
    feedHTML(data);
}

let url = "https://jsonplaceholder.typicode.com/posts/1";

function feedHTML (data) {
    console.log(data);
    let container = document.getElementById("myDiv");
    console.log("container created...", container);
    container.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>
    `;
    console.log("HTML fed...");
}

request(url, feedHTML);