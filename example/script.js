// In this example we are going to be creating two chat clients
// One will have the unread-messages plugin connected to the global channel
// The other will not, allowing you to easily see the diff

// get some references to our UI elements
const rickInput = document.getElementById('rick-input');
const rickOutput = document.getElementById('rick-output');
const mortyInput = document.getElementById('morty-input');
const mortyOutput = document.getElementById('morty-output');

// get some references to functions
let rickSend = function() {};
let mortySend = function() {};

// here we are creating two instances of chat-engine
// typically you will not do this more than once in a client side app,
// but we're having two users use the same page here
const rickClient = ChatEngineCore.create({
    publishKey: 'pub-c-bcf4e625-d5e0-45de-9f74-f222bf63a4a1',
    subscribeKey: 'sub-c-70f29a7c-8927-11e7-af73-96e8309537a2',
});

const mortyClient = ChatEngineCore.create({
    publishKey: 'pub-c-bcf4e625-d5e0-45de-9f74-f222bf63a4a1',
    subscribeKey: 'sub-c-70f29a7c-8927-11e7-af73-96e8309537a2',
});

// connect Rick to the network, and when it is successful, do some stuff
rickClient.connect('Rick');

rickClient.on('$.ready', (payload) => {

    // * * * * *  start plugin specific code  * * * * *

    // attach the unread-messages plugin to the global channel for Rick
    rickClient.global.plugin(ChatEngineCore.plugin['chat-engine-unread-messages']());

    // mark rick as active, then update his UI element to show he has no unread messages
    rickActive = function() {
        
        rickClient.global.unreadMessages.active();
        document.getElementById('rick-count').innerHTML=rickClient.global.unreadCount || '';
        
    }

    // mark rick as inactive, which will notify the plugin to start counting again
    rickInactive = function() {

        rickClient.global.unreadMessages.inactive();

    }

    // when the plugin emits an unread event, update the UI element
    // bootstap automagically makes it go away if it's '' instead of 0
    rickClient.global.on('$unread', (payload) => {

        document.getElementById('rick-count').innerHTML=rickClient.global.unreadCount || '';

    });
    
    // * * * * *  end plugin specific code  * * * * *

    // use rick's input box value as his message payload and clear it when you hit send
    rickSend = function(e) {

        rickClient.global.emit('message', {
            text: rickInput.value
        });

        rickInput.value = '';

        return false;

    };

    // hook up the enter key for maximum usability
    rickSubmit = function(e) {

        if (e.keyCode == 13) {
            rickSend();
        }
    }

    // when any message is emitted on the global channel add it to rick's chat log
    rickClient.global.on('message', (payload) => {

        let div = document.createElement("p");
        div.innerHTML = payload.sender.uuid + ': ' + payload.data.text;
        rickOutput.appendChild(div);

    });

});

// connect Morty to the network, and when it is successful, do less stuff
mortyClient.connect('Morty');
mortyClient.on('$.ready', (payload) => {

    // use morty's input box value as his message payload and clear it when you hit send
    mortySend = function(e) {

        mortyClient.global.emit('message', {
            text: mortyInput.value
        });

        mortyInput.value = '';

        return false;

    };

    // hook up the enter key for maximum usability
    mortySubmit = function(e) {

        if (e.keyCode == 13) {
            mortySend();
        }
    }

    // when any message is emitted on the global channel add it to rick's chat log
    mortyClient.global.on('message', (payload) => {

        let div = document.createElement("p");
        div.innerHTML = payload.sender.uuid + ': ' + payload.data.text;
        mortyOutput.appendChild(div);

    });

});