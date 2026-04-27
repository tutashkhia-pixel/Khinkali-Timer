// Khinkali Extension Background Worker

// Default Blocklist - Sites that steal focus
const BLOCKED_DOMAINS = [
  "reddit.com",
  "facebook.com",
  "instagram.com",
  "tiktok.com",
  "twitter.com",
  "x.com"
];

// Where to redirect if someone tries to visit a blocked site while focusing
const REDIRECT_URL = "https://khinkali-dash.netlify.app/";

// 1. Listen for state updates from the Khinkali dashboard content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TIMER_STATE_UPDATE") {
    // Save the new timer state (e.g., "running", "paused")
    chrome.storage.local.set({ timerState: request.state });
    
    // Send a little debug confirmation back
    sendResponse({ success: true, savedState: request.state });
  }
  return true; 
});

// 2. Watch for url changes across all tabs
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // We only care if the URL is actively changing or loading
  if (changeInfo.url || (tab && tab.url && changeInfo.status === 'loading')) {
    const urlToCheck = changeInfo.url || tab.url;
    
    if (!urlToCheck || urlToCheck.startsWith('chrome://')) return;

    try {
      // Check if we are currently in "Focus Mode"
      const { timerState } = await chrome.storage.local.get("timerState");
      
      if (timerState && timerState === "running") {
        // Is this URL on the naughty list?
        const isBlocked = BLOCKED_DOMAINS.some(domain => urlToCheck.includes(domain));
        
        if (isBlocked) {
          console.log(`Intercepted navigation to ${urlToCheck}. Khinkali focus is active!`);
          
          // Redirect the tab back to the dashboard
          chrome.tabs.update(tabId, { url: REDIRECT_URL });
          
          // Let the user know *why* they were redirected
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Khinkali Focus Active",
            message: "Get back to work! You've got boiling Khinkali on the stove."
          });
        }
      }
    } catch (e) {
      console.error("Error checking focus state:", e);
    }
  }
});
