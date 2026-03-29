// Khinkali Content Script
// This script runs silently on Khinkali Dash and listens for timer state broadcasts.

window.addEventListener("message", (event) => {
  // Only accept messages from the window itself
  if (event.source !== window || !event.data || !event.data.type) return;

  if (event.data.type === "KHINKALI_TIMER") {
    // Send message to the extension's background service worker
    chrome.runtime.sendMessage({
      type: "TIMER_STATE_UPDATE",
      state: event.data.state
    }, (response) => {
      // Ignore response or simply log it (silently)
      if (chrome.runtime.lastError) {
        // Can safely ignore this error if the background script isn't alive yet
      }
    });
  }
});
