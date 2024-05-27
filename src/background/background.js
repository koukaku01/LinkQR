let linkUrl = null;

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
  id: "open-popup",
  title: "Open LinkQR",
  contexts: ["page"]
});

// Create a browser menu item with id "open-popup-from-link"
browser.menus.create({
  id: "open-popup-from-link",
  title: "Generate LinkQR code",
  contexts: ["link"]
});

// Add a listener for when the menu item is clicked
browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-popup") {
    linkUrl = null; // Clear the link URL
    // Show the page action for the current tab
    browser.pageAction.show(tab.id);
    // Open the page action popup
    browser.pageAction.openPopup();
  } else if (info.menuItemId === "open-popup-from-link") {
    linkUrl = info.linkUrl; // Store the link URL
    console.log('FROM-LINK: ' + linkUrl);
    // Show the page action for the current tab
    browser.pageAction.show(tab.id);
    // Open the page action popup
    browser.pageAction.openPopup();
  }
});

// Listen for messages from the popup script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === "getLinkUrl") {
    sendResponse({ linkUrl: linkUrl });
  } else if (message.request === "clearLinkUrl") {
    linkUrl = null; // Clear the link URL
  }
});