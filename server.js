// Require the twilio and express modules
var twilio = require('twilio'),
    express = require('express');
 
// Create an express application
var app = express();
 
// Render an HTML page which contains a capability token that
// will grant permission to accept inbound calls to the ID
// "kevin" (this could be any string)
app.get('/', function(req, res) {
 
    // Create an object which will generate a capability token
    // Replace these two arguments with your own account SID
    // and auth token:
    var capability = new twilio.Capability(
        'AC6709b7b53472500fd933c6d406a75308',
        'd155ed1252ce27017bf4839f9db3e1ab'
        //process.env.TWILIO_ACCOUNT_SID,
        //process.env.TWILIO_AUTH_TOKEN
    );
 
    // Give the capability generator permission to accept incoming
    // calls to the ID "kevin"
    capability.allowClientIncoming('kevin');
 
    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
    capability.allowClientOutgoing('AP6e9196835379d10360863a1f031b9b3b');
 
    // Render an HTML page which contains our capability token
    res.render('index.ejs', {
        token:capability.generate()
    });
});
 
app.listen(1337);
//app.listen(80);
console.log('Visit http://localhost:1337/ to accept inbound calls and make outbound calls!');