// background.js

// Listen for tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Show the page action on every tab
    browser.pageAction.show(tabId);
  });
  
  // Listen for tab switching
  browser.tabs.onActivated.addListener(activeInfo => {
    // Get the current active tab
    browser.tabs.get(activeInfo.tabId).then(tab => {
      // Show the page action on the active tab
      browser.pageAction.show(tab.id);
    });
  });
  