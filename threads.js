const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function wastetime(delay) {
	const end = Date.now() + delay;
	while (Date.now() < end) {}
}

if (isMainThread) {
	console.log('starting the main thread');

	const worker = new Worker(__filename, {
		workerData: {
			msgPrefix: 'Received Message from parent',
			delay: 1000
		}
	});
	worker.on('message', (msg) => console.log(`Worker: ${msg}`))
	worker.postMessage('Done with my work');
	console.log('still in the main thread');
} else {
	parentPort.on('message', (msg) => console.log(`${workerData.msgPrefix}: ${msg}`));

	parentPort.postMessage('Getting started');
	wastetime(workerData.delay)
	parentPort.postMessage('In the middle');
	wastetime(workerData.delay)
	parentPort.postMessage('All done');
}
