/**
* Emits the ```$unread``` event on a {@link Chat} when a ```message``` event is received and the Chat is not marked as active.
* @module chat-engine-unread-messages
* @ceplugin
*/

/**
* @function
* @param {Chat} chat The {@link Chat} to add the username to. Most likely will be ```globalChat```.
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
* chat.on('$unread', (payload) -> {
*     console.log(payload.user, "sent a message you havn't seen in ", payload.chat, "the full event is", payload.event);
* });
*/
module.exports = (config) => {

    class extension {

        construct(data) {

            this.parent.isFocused = false;
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
                        sender: event.sender,
                        event: event
                    });

                }

            });

        }

        active() {

            /**
            @member unreadCount
            @ceextends Chat
            */
            this.isActive = true;
            this.parent.unreadCount = 0;
        }

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
