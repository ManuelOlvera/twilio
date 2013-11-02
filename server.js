// Require the twilio and express modules
var twilio = require('twilio'),
    express = require('express');
 
// Create an express application
var app = express();
 
// Render the Homepage
app.get('/', function(req, res) { 
    res.render('index.ejs');
});


// Render an HTML page which contains a capability token that
// will grant permission to accept inbound calls to the ID
// "richard" (this could be any string)
app.get('/richard', function(req, res) {
 
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
    capability.allowClientIncoming('richard');
 
    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
    capability.allowClientOutgoing('AP6e9196835379d10360863a1f031b9b3b');
 
    // Render an HTML page which contains our capability token
    res.render('richard.ejs', {
        token:capability.generate()
    });
});


// Render an HTML page which contains a capability token that
// will grant permission to accept inbound calls to the ID
// "mark" (this could be any string)
app.get('/mark', function(req, res) {
 
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
    capability.allowClientIncoming('mark');
 
    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
    capability.allowClientOutgoing('AP6e9196835379d10360863a1f031b9b3b');
 
    // Render an HTML page which contains our capability token
    res.render('mark.ejs', {
        token:capability.generate()
    });
});


// Render an HTML page which contains a capability token that
// will grant permission to accept inbound calls to the ID
// "franco" (this could be any string)
app.get('/franco', function(req, res) {
 
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
    capability.allowClientIncoming('franco');
 
    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
    capability.allowClientOutgoing('AP6e9196835379d10360863a1f031b9b3b');
 
    // Render an HTML page which contains our capability token
    res.render('franco.ejs', {
        token:capability.generate()
    });
});



var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log("Listening on " + port);
});

console.log('Visit http://localhost:1337/ to accept inbound calls and make outbound calls!');