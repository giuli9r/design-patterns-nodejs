const EventEmitter = require('node:events');

class UserNotifier extends EventEmitter {
    // constructor() {
    //     super();
    // }

    // notifyUser(userId, message) {
    //     this.emit('notification', { userId, message });
    // }
}

const notifier = new UserNotifier();

module.exports = notifier