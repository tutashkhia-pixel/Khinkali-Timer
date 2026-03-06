// timerWorker.js
let timerId = null;

self.onmessage = function (e) {
  if (e.data.command === 'start') {
    // If a timer is already running, clear it first to avoid duplicates
    if (timerId !== null) {
      clearInterval(timerId);
    }
    
    // Send a message back to the main thread every 250ms
    // We use 250ms for high responsiveness, but we'll do the actual
    // timestamp-based math on the main thread for precision.
    timerId = setInterval(() => {
      self.postMessage('tick');
    }, 250);
  } else if (e.data.command === 'stop') {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }
};
