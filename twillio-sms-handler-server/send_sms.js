const accountSid = 'ACe28007c7749339c9406820236d00a681';
const authToken = '48ac6b204c3d474851f138eb971d24f6';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+16178302871',
     to: '+16179593444'
   })
  .then(message => console.log(message.sid))
  .done();