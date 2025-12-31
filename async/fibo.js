function* fibonacci() {
    let current = 0, next = 1;
    while (true) {
      yield current;
      [current, next] = [next, current + next];
    }
}

const generadorFibonacci = fibonacci();

for (let i = 0; i < 10; i++) {
    console.log('Inside for cycle: ', generadorFibonacci.next().value);
}

// Continuar generando más allá del ciclo
console.log('Next number:', generadorFibonacci.next().value);
console.log('Another one:', generadorFibonacci.next().value);