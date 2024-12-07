// DOM elements
const $urlBar = document.querySelector(".urlBar");
const $qr = document.querySelector(".qr");

// Function to draw QR code
function drawQr(text) {
    // QR code colors
    let fg = "#2a2a2e"; // Foreground color
    let bg = "#f9f9fa"; // Background color

    // Generate SVG QR code
    const qr = new QRCode({
        content: text || "Hi :)", // Text content
        padding: 0, // Padding around the QR code
        color: fg, // QR code color
        background: bg, // QR code background color
        join: true, // Whether to join modules
        xmlDeclaration: false, // Whether to include XML declaration
        container: "g", // Container for SVG elements
        width: 300, // Fixed width for the QR code (you can adjust)
        height: 300 // Fixed height for the QR code (you can adjust)
    }).svg();

    // SVG QR code
    const qr_svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">${qr}</svg>`;

    // Clear previous content of $qr
    while ($qr.firstChild) {
        $qr.removeChild($qr.firstChild);
    }
    // Parse the SVG content into DOM nodes
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(qr_svg, "image/svg+xml");
    
    // Append the parsed SVG document to $qr
    const svgElement = svgDoc.documentElement;
    svgElement.setAttribute('width', '100%'); // Make it fill the width of the container
    svgElement.setAttribute('height', '100%'); // Make it fill the height of the container
    $qr.appendChild(svgElement);
}

// Retrieve the input value from the background script
browser.runtime.sendMessage({ request: "getInputValue" }).then((response) => {
    if (response.inputValue) {
        const url = response.inputValue;
        $urlBar.value = url; // Set the value of the input bar
        drawQr(url); // Generate the QR code
    }
}).catch(console.error);

// Update QR code when the user edits the URL
$urlBar.addEventListener("input", function () {
    drawQr(this.value);
});


// Retrieve the input value from the background script
browser.runtime.sendMessage({ request: "getInputValue" }).then((response) => {
    if (response.inputValue) {
        const url = response.inputValue;
        $urlBar.value = url; // Set the value of the input bar
        drawQr(url); // Generate the QR code
    }
}).catch(console.error);

// Update QR code when the user edits the URL
$urlBar.addEventListener("input", function () {
    drawQr(this.value);
});

// Recalculate QR code size whenever the window is resized
window.addEventListener("resize", function () {
    drawQr($urlBar.value); // Re-render the QR code with the updated size
});

////////////////////////////////
// Select slider, font size display, and textarea
const fontSizeSlider = document.getElementById("font-size-slider");
// const fontSizeValue = document.getElementById("font-size-value");
const textarea = document.getElementById("dynamic-textarea");

// Function to update font size
function updateFontSize() {
  const newSize = fontSizeSlider.value; // Get the slider value
  textarea.style.fontSize = `${newSize}px`; // Apply the font size to the textarea
 // fontSizeValue.textContent = `${newSize}px`; // Update the displayed font size
}

// Attach event listener to slider
fontSizeSlider.addEventListener("input", updateFontSize);
