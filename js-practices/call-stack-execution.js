let firsName = "current person";   

let spanish_greeting = function() {
    let greeting = "Hola, ";
    console.log(greeting + firsName);
    console.log("Execution Context: spanish_greeting");
    let x_in_spanish = greeting + firsName;
    english_greeting();
}

function english_greeting() {
    let greeting = "Hello, ";
    console.log(greeting + firsName);
    console.log("Execution Context: english_greeting");
    let x_in_english = greeting + firsName;
    italian_greeting();
}

italian_greeting = () => {
    let greeting = "Ciao, ";
    console.log(greeting + firsName);
    console.log("Execution Context: italian_greeting");
    let x_in_italian = greeting + firsName;
}

console.log("Global Execution Context");
spanish_greeting();
console.assert(false, "All greetings executed successfully.");

// Resultado esperado en la consola:
// Hola, current person
// Hello, current person
// Ciao, current person
