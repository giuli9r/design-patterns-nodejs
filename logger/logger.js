class Logger { 

    constructor () {
        if (!Logger.instance) {
            this.logs = [];
            Logger.instance = this;
        }

        return Logger.instance;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        console.log(`[${timestamp}] ${message}`);
    }

    getLogs() {
        return this.logs;
    }

}


module.exports = Logger;