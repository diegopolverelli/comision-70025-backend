import twilio from "twilio"
const accountSid = '';
const authToken = '';
// const client = require('twilio')(accountSid, authToken);
const client=twilio(accountSid, authToken)

client.messages
    .create({
        body: 'Prueba de mensaje desde NODE...!!!',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491154200776'
    })
    .then(message => console.log(message.sid))