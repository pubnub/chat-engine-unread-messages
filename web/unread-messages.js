(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const namespace = require('../package.json')['open-chat-framework']['namespace'];
    window.OpenChatFramework.plugin[namespace] = require('../plugin.js');

})();

},{"../package.json":2,"../plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-unread-messages",
  "version": "0.0.1",
  "main": "./plugin.js",
  "open-chat-framework": {
    "namespace": "unread-messages"
  }
}

},{}],3:[function(require,module,exports){
module.exports = (config) => {
        
    class extension {

        construct(data) {

            this.parent.isFocused = false;
            this.parent.unreadCount = 0;

            this.parent.on('message', (event) => {

                if(!this.isActive) {

                    this.parent.unreadCount++;
                    this.parent.broadcast('$unread', {
                        chat: this.parent,
                        sender: event.sender,
                        event: event
                    });

                }

            });

        }

        active() {

            this.isActive = true;
            this.parent.unreadCount = 0;
        }

        inactive() {
            this.isActive = false;
        }

    };

    // attach methods to Chat
    return {
        namespace,
        extends: {
            Chat: extension
        }
    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJwbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IG5hbWVzcGFjZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpWydvcGVuLWNoYXQtZnJhbWV3b3JrJ11bJ25hbWVzcGFjZSddO1xuICAgIHdpbmRvdy5PcGVuQ2hhdEZyYW1ld29yay5wbHVnaW5bbmFtZXNwYWNlXSA9IHJlcXVpcmUoJy4uL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJvY2YtdW5yZWFkLW1lc3NhZ2VzXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwibWFpblwiOiBcIi4vcGx1Z2luLmpzXCIsXG4gIFwib3Blbi1jaGF0LWZyYW1ld29ya1wiOiB7XG4gICAgXCJuYW1lc3BhY2VcIjogXCJ1bnJlYWQtbWVzc2FnZXNcIlxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChjb25maWcpID0+IHtcbiAgICAgICAgXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcblxuICAgICAgICBjb25zdHJ1Y3QoZGF0YSkge1xuXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnVucmVhZENvdW50ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5wYXJlbnQub24oJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzQWN0aXZlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQudW5yZWFkQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYnJvYWRjYXN0KCckdW5yZWFkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhdDogdGhpcy5wYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kZXI6IGV2ZW50LnNlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGl2ZSgpIHtcblxuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC51bnJlYWRDb3VudCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpbmFjdGl2ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8vIGF0dGFjaCBtZXRob2RzIHRvIENoYXRcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
