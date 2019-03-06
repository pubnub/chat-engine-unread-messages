(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-unread-messages",
  "version": "0.0.9",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.9.21"
  }
}

},{}],3:[function(require,module,exports){
/**
* Emits the ```$unread``` event on a {@link Chat} when a ```message``` event is received and the Chat is not marked as active.
* @module chat-engine-unread-messages
* @requires {@link ChatEngine}
*/

/**
* @function
* @example
* chat.plugin(ChatEngineCore.plugin['chat-engine-unread-messages']());
*
* // focused on the chatroom
* chat.unreadMessages.active();
*
* // looking at any other chatroom
* chat.unreadMessages.inactive();
*
* // unread count
* chat.unread;
* // 4
*
* chat.on('$unread', (payload) => {
*     console.log(payload.user, "sent a message you havn't seen in ", payload.chat, "the full event is", payload.event);
* });
*/
module.exports = () => {

    class extension {

        construct(data) {

            /**
            * Adds the property Chat.isActive to the applied Chat.
            * @member unreadMessages"."isActive
            * @ceextends Chat
            */
            this.parent.isActive = false;

            /**
            * Adds the property Chat.unreadCount to the applied Chat.
            * @member unreadMessages"."unreadCount
            * @ceextends Chat
            */
            this.parent.unreadCount = 0;

            this.parent.on('message', (event) => {

                if(!this.isActive) {

                    this.parent.unreadCount++;

                    /**
                    * @ceextends Chat
                    * @event $unread
                    * @param {Object} payload
                    * @param {Chat} chat This chat
                    * @param {User} sender The sender of the unread message
                    * @param {Object} event The raw ```message``` event.
                    */
                    this.parent.trigger('$unread', {
                        chat: this.parent,
                        sender: event.sender.uuid,
                        event: event
                    });

                }

            });

        }

        /**
        * Indicate that this {@link Chat} is visible to the user.
        * The property unreadCount is set to 0 and will not increment until inactive() is called.
        * @method unreadMessages"."active
        * @ceextends Chat
        */
        active() {

            /**
            @member unreadCount
            @ceextends Chat
            */
            this.isActive = true;
            this.parent.unreadCount = 0;
        }

        /**
        * Indicate that the chat is in the background and unread messages should increment.
        * @method unreadMessages"."active
        * @ceextends Chat
        */
        inactive() {
            this.isActive = false;
        }

    };

    // attach methods to Chat
    return {
        namespace: 'unreadMessages',
        extends: {
            Chat: extension
        }
    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2NoYXQtZW5naW5lLXBsdWdpbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLnRtcC93cmFwLmpzIiwicGFja2FnZS5qc29uIiwic3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuQ2hhdEVuZ2luZUNvcmUucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYXV0aG9yXCI6IFwiSWFuIEplbm5pbmdzXCIsXG4gIFwibmFtZVwiOiBcImNoYXQtZW5naW5lLXVucmVhZC1tZXNzYWdlc1wiLFxuICBcInZlcnNpb25cIjogXCIwLjAuOVwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiXjAuOS4yMVwiXG4gIH1cbn1cbiIsIi8qKlxuKiBFbWl0cyB0aGUgYGBgJHVucmVhZGBgYCBldmVudCBvbiBhIHtAbGluayBDaGF0fSB3aGVuIGEgYGBgbWVzc2FnZWBgYCBldmVudCBpcyByZWNlaXZlZCBhbmQgdGhlIENoYXQgaXMgbm90IG1hcmtlZCBhcyBhY3RpdmUuXG4qIEBtb2R1bGUgY2hhdC1lbmdpbmUtdW5yZWFkLW1lc3NhZ2VzXG4qIEByZXF1aXJlcyB7QGxpbmsgQ2hhdEVuZ2luZX1cbiovXG5cbi8qKlxuKiBAZnVuY3Rpb25cbiogQGV4YW1wbGVcbiogY2hhdC5wbHVnaW4oQ2hhdEVuZ2luZUNvcmUucGx1Z2luWydjaGF0LWVuZ2luZS11bnJlYWQtbWVzc2FnZXMnXSgpKTtcbipcbiogLy8gZm9jdXNlZCBvbiB0aGUgY2hhdHJvb21cbiogY2hhdC51bnJlYWRNZXNzYWdlcy5hY3RpdmUoKTtcbipcbiogLy8gbG9va2luZyBhdCBhbnkgb3RoZXIgY2hhdHJvb21cbiogY2hhdC51bnJlYWRNZXNzYWdlcy5pbmFjdGl2ZSgpO1xuKlxuKiAvLyB1bnJlYWQgY291bnRcbiogY2hhdC51bnJlYWQ7XG4qIC8vIDRcbipcbiogY2hhdC5vbignJHVucmVhZCcsIChwYXlsb2FkKSA9PiB7XG4qICAgICBjb25zb2xlLmxvZyhwYXlsb2FkLnVzZXIsIFwic2VudCBhIG1lc3NhZ2UgeW91IGhhdm4ndCBzZWVuIGluIFwiLCBwYXlsb2FkLmNoYXQsIFwidGhlIGZ1bGwgZXZlbnQgaXNcIiwgcGF5bG9hZC5ldmVudCk7XG4qIH0pO1xuKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcblxuICAgICAgICBjb25zdHJ1Y3QoZGF0YSkge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogQWRkcyB0aGUgcHJvcGVydHkgQ2hhdC5pc0FjdGl2ZSB0byB0aGUgYXBwbGllZCBDaGF0LlxuICAgICAgICAgICAgKiBAbWVtYmVyIHVucmVhZE1lc3NhZ2VzXCIuXCJpc0FjdGl2ZVxuICAgICAgICAgICAgKiBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogQWRkcyB0aGUgcHJvcGVydHkgQ2hhdC51bnJlYWRDb3VudCB0byB0aGUgYXBwbGllZCBDaGF0LlxuICAgICAgICAgICAgKiBAbWVtYmVyIHVucmVhZE1lc3NhZ2VzXCIuXCJ1bnJlYWRDb3VudFxuICAgICAgICAgICAgKiBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnBhcmVudC51bnJlYWRDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50Lm9uKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc0FjdGl2ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LnVucmVhZENvdW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICogQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICAgICAgICAgICAgICogQGV2ZW50ICR1bnJlYWRcbiAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Q2hhdH0gY2hhdCBUaGlzIGNoYXRcbiAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1VzZXJ9IHNlbmRlciBUaGUgc2VuZGVyIG9mIHRoZSB1bnJlYWQgbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBUaGUgcmF3IGBgYG1lc3NhZ2VgYGAgZXZlbnQuXG4gICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LnRyaWdnZXIoJyR1bnJlYWQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0OiB0aGlzLnBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRlcjogZXZlbnQuc2VuZGVyLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiBJbmRpY2F0ZSB0aGF0IHRoaXMge0BsaW5rIENoYXR9IGlzIHZpc2libGUgdG8gdGhlIHVzZXIuXG4gICAgICAgICogVGhlIHByb3BlcnR5IHVucmVhZENvdW50IGlzIHNldCB0byAwIGFuZCB3aWxsIG5vdCBpbmNyZW1lbnQgdW50aWwgaW5hY3RpdmUoKSBpcyBjYWxsZWQuXG4gICAgICAgICogQG1ldGhvZCB1bnJlYWRNZXNzYWdlc1wiLlwiYWN0aXZlXG4gICAgICAgICogQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICovXG4gICAgICAgIGFjdGl2ZSgpIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICBAbWVtYmVyIHVucmVhZENvdW50XG4gICAgICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnVucmVhZENvdW50ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIEluZGljYXRlIHRoYXQgdGhlIGNoYXQgaXMgaW4gdGhlIGJhY2tncm91bmQgYW5kIHVucmVhZCBtZXNzYWdlcyBzaG91bGQgaW5jcmVtZW50LlxuICAgICAgICAqIEBtZXRob2QgdW5yZWFkTWVzc2FnZXNcIi5cImFjdGl2ZVxuICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBpbmFjdGl2ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8vIGF0dGFjaCBtZXRob2RzIHRvIENoYXRcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICd1bnJlYWRNZXNzYWdlcycsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
