// Select all elements with the data-locale attribute
document.querySelectorAll('[data-locale]').forEach(elem => {
    // Get the message key from the data-locale attribute
    let messageKey = elem.dataset.locale;

    // Retrieve the localized message using the message key
    let translatedText = browser.i18n.getMessage(messageKey);

    // If a localized message is found, set it as the element's inner text
    if (translatedText) {
        elem.innerText = translatedText;
    }
});

// This script disables the default zoom behavior in the popup body when the Ctrl key is pressed during scrolling
document.addEventListener('DOMContentLoaded', function () {
    // Select the popup body element
    var popupBody = document.querySelector('.popup-body');

    // Add a wheel event listener to the popup body
    popupBody.addEventListener('wheel', function (event) {
        // Check if the Ctrl key is pressed
        if (event.ctrlKey) {
            // If Ctrl key is pressed, prevent the default zoom behavior
            event.preventDefault();
        }
    });
});