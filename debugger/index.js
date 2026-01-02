function complexOperation () {
    console.time('complexOperation started');
    console.log('Starting complex operation...');
    for (let i = 0; i < 1e6; i++) {
        Math.sqrt(i);
    }
    console.timeEnd('complexOperation started');
    console.trace('Trace: complexOperation called');
}

function operationA() {
    console.log('Performing operation A...');
    complexOperation();
}

function operationB() {
    console.log('Performing operation B...');
    operationA();
}

function main() {
    console.log('Application started');
    operationB();
    console.log('Application finished');
}

main();