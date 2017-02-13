'use strict';

const EventRouter   = require('event-router');
const slice         = Array.prototype.slice;

Emitter.create = () => Emitter();

module.exports = Object.freeze(Emitter);

function Emitter() {
    let listeners = [];
    
    return Object.freeze({
        on: addListener,
        addListener,
        once,
        off: removeListener,
        removeListener,
        offAll: removeAllListeners,
        removeAllListeners,
        emit
    });
    
    function addListener(event, fn) {
        const router = EventRouter.create(event);
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
        listeners = listeners
            .filter(listener => listener.event !== event || !fn || listener.fn !== fn);
    }
    
    function removeAllListeners() {
        listeners = [];
    }
    
    function emit(event) {
        const args = slice.call(arguments, 1);
        
        listeners.forEach((listener) => {
            const result = listener.router.parse(event);
            
            if (!result) return;
            listener.fn(...result.concat(args));
        });
    }
}
