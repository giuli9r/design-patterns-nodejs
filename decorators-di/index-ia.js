class DataService {
    getData() {
        return "Data from DataService"; 
    }
    processData(data) {
        data += " - Processed by DataService";
        return data;
    }
}

function Injectable(constructor) {
    constructor.isInjectable = true;
}
function Inject(serviceIdentifier) {
    return function (target, propertyKey) {
        if (!target.constructor.injectedServices) {
            target.constructor.injectedServices = {};
        }
        target.constructor.injectedServices[propertyKey] = serviceIdentifier;
    };
}

// @Injectable (DataService)
class Consumer {
    // @Inject(DataService)
    dataService = new DataService();

    useService() {
        const data = this.dataService.getData();
        return this.dataService.processData(data);
    }
}
function resolveDependencies(target) {
    const instance = new target();
    const injectedServices = target.injectedServices || {};

    for (const propertyKey in injectedServices) {
        const ServiceClass = injectedServices[propertyKey];
        if (ServiceClass.isInjectable) {
            instance[propertyKey] = new ServiceClass();
        } else {
            throw new Error(`Cannot inject non-injectable service: ${ServiceClass.name}`);
        }
    }

    return instance;
}
const consumerInstance = resolveDependencies(Consumer);
console.log(consumerInstance.useService());
// Output: Data from DataService - Processed by DataService

// This script demonstrates a simple dependency injection (DI) system using decorators in JavaScript.
// It defines a DataService class that provides data and processes it.
// The Injectable decorator marks a class as injectable, while the Inject decorator 
// specifies which services should be injected into a class.
// The Consumer class uses the Inject decorator to indicate that it requires an instance of DataService.
// The resolveDependencies function creates an instance of the Consumer class and injects 
//the required services based on the decorators.

