         // Register an event handler to be called when there is an incoming
        // call:
        Twilio.Device.incoming(function(connection) {

            console.log(connection.parameters.From);
            var key = connection.parameters.From+callerId;

            $.ajax({
                url: "/getcontext?key="+key,
                type: "GET",
                success: function(data){
                    var obj = jQuery.parseJSON(data);
                    var message = obj.value;
                    if (obj.value == null)
                        message = 'External call';

                    $('#dialogtext').html(message);
                    
                    $('#accept').click(function(){
                        connection.accept();
                        $('p').html('Call in progress...');
                        $('#dialogtext').html(message);
                    });
                    $('#deny').click(function(){
                        connection.reject();
                        $('p').html('Awaiting incoming call...');
                        $('#dialogtext').html(message);
                    });
                    
                    $('#modal').show();

                    /*
                     * jQuery UI Dialog: Modal Dialog with Buttons
                     * http://salman-w.blogspot.com/2013/05/jquery-ui-dialog-examples.html
                     */
                    $('#modal').reveal({ // The item which will be opened with reveal
                        animation: 'fade',                   // fade, fadeAndPop, none
                        animationspeed: 600,                       // how fast animtions are
                        closeonbackgroundclick: true,              // if you click background will modal close?
                        dismissmodalclass: 'close'    // the class of a button or element that will close an open modal
                    });

                }
            });
        });

        //Load message in the context
        $( document ).ready(function() {
            
          $('textarea#context').html(getMessage());

        });
 
        // Register an event handler for when a call ends for any reason
        Twilio.Device.disconnect(function(connection) {
            $('p').html('Awaiting incoming call...');
        });
 
        // Add a click event for the button, which will hang up the current
        // call when clicked:
        $('#hangup').click(function() {
            Twilio.Device.disconnectAll();
        });
 
        // Make an outbound call to the number given in the text field:
        $('#call').on('click', function() {
 
            // The properties of this object will be sent as POST
            // Parameters to URL which generates TwiML.
            Twilio.Device.connect({
                CallerId:callerId, // Replace this value with a verified Twilio number:
                                    // https://www.twilio.com/user/account/phone-numbers/verified
 
                PhoneNumber:$('#number').val() //pass in the value of the text field
            });
        });

        // Make an outbound call to the number given in the text field:
        $('#callrichard').on('click', function() {
 
            pushContext(callerId+'+19188760389');

            // The properties of this object will be sent as POST
            // Parameters to URL which generates TwiML.
            Twilio.Device.connect({
                CallerId:callerId, // Replace this value with a verified Twilio number:
                                    // https://www.twilio.com/user/account/phone-numbers/verified
 
                PhoneNumber:'+19188760389' //pass in the value of the text field
            });
        });

        // Make an outbound call to the number given in the text field:
        $('#callfranco').on('click', function() {

            pushContext(callerId+'+19028001203');
 
            // The properties of this object will be sent as POST
            // Parameters to URL which generates TwiML.
            Twilio.Device.connect({
                CallerId:callerId, // Replace this value with a verified Twilio number:
                                    // https://www.twilio.com/user/account/phone-numbers/verified
 
                PhoneNumber:'+19028001203' //pass in the value of the text field
            });
        });


        // Make an outbound call to the number given in the text field:
        $('#callmark').on('click', function() {

            pushContext(callerId+'+16203254569');
 
            // The properties of this object will be sent as POST
            // Parameters to URL which generates TwiML.
            Twilio.Device.connect({
                CallerId:callerId, // Replace this value with a verified Twilio number:
                                    // https://www.twilio.com/user/account/phone-numbers/verified
 
                PhoneNumber:'+16203254569' //pass in the value of the text field
            });
        });






        function getMessage(){
            var now = new Date();
            return name + ' is calling.... He started the session on ' + now.toString();
        }

        function pushContext(key){
            var message = $('textarea#context').val();
            $.ajax({
                url: "/store?key="+key+"&message="+message,
                type: "GET",
                success: function(data){
                    // alert(message + ' Sent with key ' + key);
                    // alert(data);
                }
            });
        }