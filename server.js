// Require the twilio and express modules

var twilio = require('twilio'),
    express = require('express');


//Cache
var rtg   = require("url").parse('redis://redistogo:152f37f0b237d3c3596fce8ce48ed514@beardfish.redistogo.com:10769/');
var redis = require("redis").createClient(rtg.port, rtg.hostname);

redis.auth(rtg.auth.split(":")[1]);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

redis.on("error", function (err) {
    console.log("Error " + err);
});

//redis.set("string key", "string val", redis.print);
//redis.del();

// Create an express application
var app = express();
app.set('view engine', 'ejs');
 
// Render the Homepage
app.get('/', function(req, res) { 
    res.render('index.ejs', {});
});




//Store message in cache
app.get('/store', function(req, res) {

    var key = req.query.key;
    var message = req.query.message;

    redis.set(key, message, redis.print);

    res.send(JSON.stringify({ success: true }));
});

//Get message from cache
app.get('/getcontext', function(req, res) {

    var key = req.query.key;
    var message = req.query.message;

    redis.get(key, function(err, reply) {
        redis.del(key);
        // reply is null when the key is missing
        console.log(reply);
        res.send(JSON.stringify({ key: key, value: reply }));
    });



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
    capability.allowClientOutgoing('AP5e129a7a9ed1593dd2d6d94bd84ad440');
 
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
    capability.allowClientOutgoing('APd511fb355eb9c5374e411a463bbd1a93');
 
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