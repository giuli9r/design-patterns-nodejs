class Pet {

    constructor(name) {
        this.name = name;
    }
}

class PetFactory {

    createPet(name) {
        return new Pet(name);
    }

}

const factory = new PetFactory();

const doggy = factory.createPet('Mila');
const kitty = factory.createPet('Puppa');
console.log(doggy.name);
console.log(kitty.name);
console.log(doggy === kitty);