// Variable to store the URL of a link when "Generate LinkQR code" is used
let linkUrl = null;

/* 
  Event Listener: Tabs Updated
  Triggered whenever a tab is updated (e.g., loaded, refreshed).
  Ensures the page action (icon in the address bar) is visible on every tab.
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  browser.pageAction.show(tabId); // Display the page action icon
});

/* 
  Event Listener: Tab Activated
  Triggered whenever the user switches to a different tab.
  Ensures the page action is visible on the active tab.
*/
browser.tabs.onActivated.addListener(activeInfo => {
  // Fetch the active tab's details
  browser.tabs.get(activeInfo.tabId).then(tab => {
    browser.pageAction.show(tab.id); // Display the page action icon
  });
});

/* 
  Context Menu Item: Open LinkQR
  Adds a menu item to the context menu (right-click menu) on any page.
  Used to open the LinkQR popup directly from the page.
*/
browser.menus.create({
  id: "open-popup",
  title: "Open LinkQR",
  contexts: ["page"] // Context: Visible when right-clicking on the page
});

/* 
  Context Menu Item: Generate LinkQR Code
  Adds a menu item to the context menu (right-click menu) for links.
  Used to generate a QR code for the specific link.
*/
browser.menus.create({
  id: "open-popup-from-link",
  title: "Generate LinkQR code",
  contexts: ["link"] // Context: Visible when right-clicking on a link
});

/* 
  Event Listener: Context Menu Click
  Triggered when a context menu item is clicked.
  Handles actions based on the selected menu item.
*/
browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-popup") {
    linkUrl = null; // Clear any previously stored link URL
    browser.pageAction.show(tab.id); // Ensure the page action icon is visible
    browser.pageAction.openPopup(); // Open the page action popup
  } else if (info.menuItemId === "open-popup-from-link") {
    linkUrl = info.linkUrl; // Store the clicked link's URL
    console.log('FROM-LINK: ' + linkUrl); // Log the link URL for debugging
    browser.pageAction.show(tab.id); // Ensure the page action icon is visible
    browser.pageAction.openPopup(); // Open the page action popup
  }
});

/* 
  Event Listener: Runtime Messages
  Listens for messages sent from other parts of the extension (e.g., popup scripts).
  Responds to requests for link URLs or clears stored data.
*/
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === "getLinkUrl") {
    // Respond with the currently stored link URL
    sendResponse({ linkUrl: linkUrl });
  } else if (message.request === "clearLinkUrl") {
    // Clear the stored link URL
    linkUrl = null;
  }
});

/* 
  Input Bar Value Logging
  Stores and retrieves the value of the input bar for debugging or further actions.
*/
let inputValue = null;

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.inputValue) {
    inputValue = message.inputValue; // Store the input value
    console.log("Received input value:", inputValue); // Log the input value for debugging
  } else if (message.request === "getInputValue") {
    // Respond with the stored input value
    sendResponse({ inputValue: inputValue });
    inputValue = null; // Clear the stored input value
    console.log("Input value cleared after responding.");
  }
});
