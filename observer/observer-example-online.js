const EventEmitter = require('events');

class Notifier extends EventEmitter {
    constructor() {
        if (!Notifier.instance) {
            super();
            Notifier.instance = this;
        }

        return Notifier.instance;
    }

    notify(eventName, payload) {
        this.emit(eventName, payload);
    }
}

module.exports = Notifier;
// ```Aqui se crea la logica del emitor de eventos, 
// que es un singleton y es bastante sencillo. 
// Solo se creo el metodo notify, que recibe el nombre del evento y el payload, que realmente puede ser opcional.

// Luego, en observer.js
const Notifier = require('./notifier');

class Observer {
    constructor() {
        if (!Observer.instance) {
            Observer.instance = this;
        }

        this.notifier = new Notifier();
        return Observer.instance;
    }

    subscribe(event, callback) {
        this.notifier.on(event, callback);
    }
}

module.exports = Observer;

// En la clase Observer, que tambien es bastante sencilla, se crea solo un metodo `subscribe` que toma el evento, 
// asi como el callback.Ahora, ya juntado esto, en index.js

const Observer = require('./observer');
const Notifier = require('./notifier');

const observerInstance = new Observer();
const notifierInstance = new Notifier();

observerInstance.subscribe('message', (message) => {
    console.log(message);
});

setTimeout(() => {
    notifierInstance.notify('message', 'Hello, world!');
}, 2000);

// ```Yo puedo importar mi Observador y mi Notifier desde donde yo quiera en mi aplicación, 
// y al ser singletons, tengo la seguridad de que no voy a tener duplicaciones de eventos. 
// Y que me suscriba más de una vez a un evento.Ahora, que le falta a mi implementación?
// Probablemente un enum para no tener errores de ortografia con los nombres de los eventos, 
// se podria hacer con un simple objeto.Además, una función unsubscribe para que paremos de 
// escuchar cada vez que se emita el evento.Pero para agregar el unsubscribe, tuve que hacer unos 
// cambios a la clase Observer, pero así fue como quedo el metodo:```js
unsubscribe(event, listener) {
    this.notifier.off(event, listener);
}
// ```Solo que aqui tenemos un problema, ya que para cancelar el evento, necesitas el listener, 
// que vendria siendo el callback del subscribe. Entonces, por esa razón tambien tuve que modificar 
// la función subscribe de la siguiente manera:```js
subscribe(event, callback) {
    this.notifier.on(event, callback);
    
    return callback;
}
// ```Lo unico que cambio es que ahora retorno el callback, que se estaria usando de la siguiente manera en el index.js```js
const Observer = require('./observer');
const Notifier = require('./notifier');

const observerInstance = new Observer();
const notifierInstance = new Notifier();

const listener1 = observerInstance.subscribe('message', (message) => {
    console.log(message);
});

setTimeout(() => {
    notifierInstance.notify('message', 'Hello, world!');
    observerInstance.unsubscribe('message', listener1);
}, 2000);

setTimeout(() => {
    notifierInstance.notify('message', 'Hello World!');
    console.log('Second notification sent');
}, 5000);

// ```Pueden probarlo por su cuenta, solo deberian tener dos console.logs.
// Uno de "Hello World!" y otro de "'Second notification sent'"