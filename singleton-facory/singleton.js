class Singleton { 
    
    /* 
    CLASSIC VERSION
    */
    // constructor() {
    //     if (Singleton.instance) {
    //         return Singleton.instance;
    //     }
    //     // this.instance = this; !ERROR: crea una propiedad de instancia.
    //     Singleton.instance = this; // OK: Vive en la clase, no en cada objeto. Se comparte entre todas las instanciaciones
    //     // COMENTARIOS ABAJO
    // }
    /* 
    END CLASSIC VERSION
    */

    /* 
    MODERN VERSION
    */
    static instance;

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
   
    /* 
    END MODERN VERSION
    */

    // FUNCTIONS
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

}

// const instance1 = new Singleton();
// const instance2 = new Singleton();
// console.log( "ckeck bool CLASSIC VER: ");
// console.log(instance1 === instance2);
// modern version
const instance1modern = Singleton.getInstance();
const instance2modern = Singleton.getInstance();
console.log( "ckeck bool MODERN VER: ");
console.log(instance1modern === instance2modern);

// COMENTARIOS
// this → este objeto en particular
// Singleton → la clase completa

// Un Singleton no pertenece a un objeto, pertenece a la clase.
// Si lo guardás en this, cada objeto cree que es especial.
// Si lo guardás en Singleton, hay un único rey