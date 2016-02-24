'use strict';
const toFactory     = require('tofactory'),
      EventRouter   = require('event-router'),
      slice         = Array.prototype.slice;

module.exports = toFactory(Emitter);

function Emitter() {
    const listeners = [];
    
    return {
        on,
        off,
        emit
    };
    
    function on(event, fn) {
        let router = EventRouter.create(event);
        listeners.push({event, router, fn});
    }
    
    function off(event, fn) {
        listeners.forEach(function (listener, i) {
            if (listener.event === event) {
                if (!fn || listener.fn === fn) {
                    listener.splice(i, 1);
                }
            }
        });
    }
    
    function emit(event) {
        const args = slice.call(arguments, 1);
        
        listeners.forEach(function (listener) {
            const result = listener.router.parse(event);
            
            if (!result) return;
            listener.fn.apply(undefined, result.concat(args));
        });
    }
}