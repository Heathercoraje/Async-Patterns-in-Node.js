class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit('begin');
    try {
      console.time('execute');
      const data = await asyncFunc(...args);
      this.emit('data', data);  
      console.timeEnd('execute');
      this.emit('end');
    } catch(err) {
      this.emit('error', err);
    }
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fs.readFile, __filename);

// to work with the data event,
// the listener function that we register will get access to the data argument
//  that was passed to the emitted event and that data object is exactly what the asyncfunc exposes
// https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture-223292fcbc2d/
