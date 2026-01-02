const diagnostics = require('node:diagnostics_channel');

const channel_app = diagnostics.channel('app-events');


function onMessageReceived(message) {
    // enviar mensaje a logs, luego seguir. esto no frena event loop. 
  console.log('Message received:', message);
}

diagnostics.subscribe('app-events', onMessageReceived);    

if (channel_app.hasSubscribers) {
    channel_app.publish('Diagnostics Channel for Apps');
}
if(diagnostics.unsubscribe('app-events', onMessageReceived)){
    console.log('Unsubscribed from app-events channel successfully.');
} else {
    console.log('No subscription found for app-events channel.');
}