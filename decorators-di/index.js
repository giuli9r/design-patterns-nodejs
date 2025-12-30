class DataService {
    getData() {
        return "input data"; 
    }
    processData(data) {
        data += " - Processed by DataService";
        return data;
    }
}

// decorar data service with logging functionality
class DataServiceWithLoggin {

    constructor(dataService, logger) {
        this.logger = logger;
        this.dataService = dataService;
    }

    processData(data) {
        this.logger.log(`Processing data: ${data}`);
        const processedData = this.dataService.processData(data);
        this.logger.log(`Processed data: ${processedData}`);

        return processedData;
    }
}

const logger = {
    log: (message) => console.log(`[Logger]: ${message}`)
};

const baseService = new DataService();
const data = baseService.getData();
const decoratedDataServiceWithLogging = new DataServiceWithLoggin(baseService, logger);

const processedData = decoratedDataServiceWithLogging.processData(data);
console.log(`resultado procesado: ${processedData}`);
