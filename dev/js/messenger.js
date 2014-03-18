/**
 * @name Messenger
 * @author Kevin Greene
 */
(function(exports, kg) {

    'use strict';

    if (typeof kg === 'undefined') {
        return;
    }

    /**
     * @name Messenger
     * @description handles app-wide messaging between components
     */
    var Messenger = (function() {

        var Messenger = {};
        var messages = {};

        /**
         * @name Messenger.on
         * @description adds a callback function and function context to
         * be fired on the given event.
         * @param message - event name
         * @param fn - callback function
         * @param ctx - context in which to execute the callback (optional)
         * will default to the global object
         */
        Messenger.on = function(message, fn, ctx) {

            var shouldAdd = true;
            var ctx = ctx || exports;

            if (!messages[message]) {
                messages[message] = [];
            }

            for (var i = 0; i < messages[message].length; i++) {

                var obj = messages[message][i];

                if (obj.fn === fn && obj.ctx === ctx) {
                    shouldAdd = false;
                    break;
                }
            }

            if (shouldAdd) {

                messages[message].push({
                    fn: fn,
                    ctx: ctx
                });
            }
        };

        /**
         * @name Messenger.off
         * @description remove a callback function for a given message. if the
         * callback function is not provided, all callbacks for the given event
         * will be removed.
         * @param message - event name
         * @param fn - callback function (optional)
         */
        Messenger.off = function(message, fn) {

            if (typeof message === 'undefined') {

                if (messages[message]) {

                    if (typeof fn === 'undefined') {
                        delete messages[message];
                        return;
                    }

                    for (var i = 0; i < messages[message].length; i++) {

                        var obj = messages[message][i];

                        if (obj.fn === fn) {
                            messages[message].splice(i, 1);
                            return;
                        }
                    }
                }
            }
        };

        /**
         * @name Messenger.broadcast
         * @description broadcast the given event to all subscribers
         * @param message - event name
         * @param data - data to be sent to callback functions (optional)
         */
        Messenger.broadcast = function(message, data) {

            if (messages[message]) {

                for (var i = 0; i < messages[message].length; i++) {

                    var obj = messages[message][i];
                    var fn = obj.fn;
                    var ctx = obj.ctx;

                    if (typeof fn === 'function') {
                        fn.call(ctx || exports, data);
                    }
                }
            } else {
                return false;
            }
        };

        return Messenger;

    }());

    kg.Messenger = Messenger;

}(window, window.kg))