import twilio from "twilio"
const accountSid = '';
const authToken = '';
// const client = require('twilio')(accountSid, authToken);
const client=twilio(accountSid, authToken)
client.messages
    .create({
        body: 'Prueba...!!!',
        from: '+15107370619',
        to: '+541154200776'
    })
    .then(message => console.log(message.sid));