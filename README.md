# create-emitter

Event emitter with event router, created for projects designed with composition pattern

## Installation

	npm install create-emitter --save


## Usage Example

```javascript
    'use strict';
    
	const Emitter = require('create-emitter'),
	      emitter = Emitter.create();
    
    // just a data example
    let operation   = 'insert',
        user        = {id: 22, name: 'John Doe', age: 32};
    
    
    // you can listen with "unnamed" route
    emitter.on('users:insert|update:*', function (action, id, data) {
        console.log('action:', action);
        console.log('id:', id);
        console.log(data);
    });
    
    emitter.emit(`users:${operation}:${_id}`, user);
    // action: insert
    // id: 22
    // {id: 22, name: 'John Doe', age: 32}
    
    
    
    // or you can listen with "named" route
    emitter.on('{collection}:{action=insert|update}:{id}', function (route, data) {
        console.log(route);
        console.log(data);
    });
    
    emitter.emit(`users:${operation}:${_id}`, user);
    // {collection: 'users', action: 'insert', id: 22};
    // {id: 22, name: 'John Doe', age: 32}
    
```

##LICENSE
The MIT License (MIT)

Copyright (c) 2016 MauroJr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
