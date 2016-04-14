'use strict';

const toFactory     = require('tofactory');
const EventRouter   = require('event-router');
const slice         = Array.prototype.slice;

module.exports = toFactory(Emitter);

function Emitter() {
    let listeners = [];
    
    return {
        on: addListener,
        addListener,
        once,
        off: removeListener,
        removeListener,
        offAll: removeAllListeners,
        removeAllListeners,
        emit
    };
    
    function addListener(event, fn) {
        let router = EventRouter.create(event);
        listeners.push({event, router, fn});
    }
    
    function once(event, fn) {
        const onceFn = function () {
            const args = slice.call(arguments);
            
            fn.apply(undefined, args);
            removeListener(event, onceFn);
        };
        
        addListener(event, onceFn);
    }
    
    function removeListener(event, fn) {
        listeners.forEach(function (listener, i) {
            if (listener.event === event) {
                if (!fn || listener.fn === fn) {
                    listeners.splice(i, 1);
                }
            }
        });
    }
    
    function removeAllListeners() {
        listeners = [];
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