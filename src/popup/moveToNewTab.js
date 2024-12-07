document.addEventListener('DOMContentLoaded', function () {
    // Get the button and input field from the popup
    const logButton = document.getElementById('logButton');
    const inputField = document.getElementById('inputbar');

    // Add event listener to the button
    logButton.addEventListener('click', function () {
        const inputValue = inputField.value;  // Get the value from the input field

        // Send the input value to the background script
        browser.runtime.sendMessage({ inputValue: inputValue });

        // Open a new tab with the URL "newTabPage.html"
        browser.tabs.create({ url: '/newTabPage/newTabPage.html' }, function (newTab) {
            // Focus the new tab (optional, but it ensures the tab gets focused)
            browser.tabs.update(newTab.id, { active: true });
        });

    });
});
