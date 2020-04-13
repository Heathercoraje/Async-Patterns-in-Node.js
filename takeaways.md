# Async-Patterns-in-Node.js

#### Writing Asynchronous Code With Promise and Async & Await

For asynchrous tasks suh as file I/O or fetching external data, Node uses callbacks. A callback is a function called at the completion of a given code which prevents any blocking and allows other code to run in the meantime. Using callbacks can create *Callback Hell* easily with even a few layers of higer order functions. 

Traditional callbacks can be replaced with Promises.Promises exist to make the complexity of making asynchronous requests more managable. One of main benefits of using promises: no inversion of control. Promise constructor returns a Promise object which has 3 states which are `pending`, `fulfilled` and `rejected`. Depending on the state of request, you can pass function you want to run using `.then` when successful and `.catch` when fails. This gives us control of functions what to do when invoked. Secondly, Promises increases readability. Promises allow us to write code in sequential way of thinking. For example, you can chain promises and still expect the code to read in sequential order. 

On top of this, since es2015, node now supports `Async/Await` to make asynchrous code easier. Async and await keywords improve readability of code by making asynchrous code look like synchrous code. Async functions return promise implicitly therefore you will have to use `.then` to access value returned from promise. FOr error handling, you can use `try/catch` block to catch the error.  

[Useful read - Async JavaScript: From Callbacks, to Promises, to Async/Await by Tyler McGinnis
](https://tylermcginnis.com/async-javascript-from-callbacks-to-promises-to-async-await/)

---

#### Writing Event-driven Code with EventEmitters

NodeJS is a single threaded application but it supports concurrency via concept of event and callbacks. Node uses Observer pattern. Observer pattern is the basis for event-driven architectures we use in Javascript and Node. Node keeps an event loop and whenever tasks get completed, it fires corresponding event which invokes event-listener function.

EventEmitter is a module that facilitates communication between objects in node. In Node, there are many event-driven modules. For exampke,`createServer` uses `EventEmitter` under the hood.  EventEmitter is at the core of node asynchronous event-driven architecture. The concept is simple. Emitter objects emit named events that invoke registered listener to be called. However, do not assume that events mean synchrous or asynchronous. To acomplish events to behave as you want, you need to combine a callback with an event emitter. If asynchronous function support promises, you can use async/await to do the same. [Here](./events/eventEmiiterAsync.js) is an exmaple.

[Useful read - What does it mean "event-driven" in JavaScript and Node.js?
](https://www.valentinog.com/blog/event/)


---

#### Utilising Worker Threads
Worker Threads only helps CPU intensive operations. There are solutions. i.e cluster API(using multiple processes) however, it sacrifices shared memory. Worker threads allows to have threads running in background within one process. 

[Useful read - Node.js multithreading: What are Worker threads, and why do they matter?](https://www.valentinog.com/blog/event/)
