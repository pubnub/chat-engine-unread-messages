# Unread Messages Plugin

Adds the ability to count unread messages in ChatEngine.Chats

### Quick Start

0. Have chat engine instatiated and connected and have a channel you want to count unread messages on
```javascript
const CE = ChatEngineCore.create({
    publishKey: 'pub-key-here',
    subscribeKey: 'sub-key-here',
});

CE.connect('Username');
CE.on('$.ready', () => { ... }
```

1. Attach this plugin to the channel you want, in this case global
```javascript
CE.global.plugin(ChatEngineCore.plugin['chat-engine-unread-messages']());
```

2. The plugin needs to be notified when the user is considered active or inactive to properly count messages  
```javascript
// sets unreadCount to 0, stops counting unread messages and stops emitting events
CE.global.unreadMessages.active();
```
```javascript
// starts counting unread messages and starts emitting events - default state
CE.global.unreadMessages.inactive();
```

3. Listen for the `$unread` events that emit whenever your channel recieves a message while it is marked as inactive  
```javascript
CE.global.on('$unread', () => {
    console.log(ChatEngine.global.unreadCount);
});
```