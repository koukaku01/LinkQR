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

// Create a browser menu item with id "open-popup"
browser.menus.create({
  id: "open-popup",                    // Unique identifier for the menu item
  title: "Open LinkQR",                // Text displayed for the menu item
  contexts: ["all"],                   // Menu item appears in all contexts
});

// Add a listener for when the menu item is clicked
browser.menus.onClicked.addListener(() => {
  browser.pageAction.openPopup();      // Open the page action popup
});