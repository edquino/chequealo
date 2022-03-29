
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

let sms = {};

sms.message = ({body,to}) => {
    client.messages
    .create({
       body,
       from: '+17316783178',
       to
     })
    .then(message => console.log(message.sid));
};

module.exports = sms;
