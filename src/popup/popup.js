// DOM elements
const $text = document.querySelector(".inputbar"); // Input field for text
const $qr = document.querySelector(".qr"); // Container for QR code display
// const $downloadPngBtn = document.getElementById("downloadPngBtn"); // PNG download button
// const $downloadSvgBtn = document.getElementById("downloadSvgBtn"); // SVG download button
const $buttonCopy = document.querySelector(".buttonCopy"); // Button to copy QR code PNG image
const SIZE = 798; // Size of the QR code

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
        width: SIZE, // QR code width
        height: SIZE // QR code height
    }).svg();

    // SVG QR code
    const qr_svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">${qr}</svg>`;

    // Update SVG download link

    // Clear previous content of $qr
    while ($qr.firstChild) {
        $qr.removeChild($qr.firstChild);
    }
    // Parse the SVG content into DOM nodes
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(qr_svg, "image/svg+xml");
    // Append the parsed SVG document to $qr
    $qr.appendChild(svgDoc.documentElement);

    // Convert SVG to PNG and update PNG download link
    const qr_png = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="800">${qr}</svg>`;
    const $img = new Image();
    $img.src = "data:image/svg+xml;base64," + btoa(qr_png);
    $img.addEventListener("load", function () {
        const $canvas = document.createElement("canvas");
        $canvas.width = this.width;
        $canvas.height = this.height;

        const $ctx = $canvas.getContext("2d");
        $ctx.drawImage(this, 0, 0);
        $buttonCopy.href = $canvas.toDataURL();
    });
}

// Function to handle download based on format
function downloadQRCode(format) {
    // Get the SVG content of the QR code
    const qr_svg = $qr.querySelector("svg").outerHTML;

    // Convert SVG to PNG if the format is PNG
    if (format === "png") {
        const $canvas = document.createElement("canvas");
        const ctx = $canvas.getContext("2d");
        const img = new Image();

        img.onload = function () {
            $canvas.width = img.width;
            $canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert canvas to PNG data URL
            const pngDataURL = $canvas.toDataURL("image/png");

            // Trigger download of PNG file
            const downloadLink = document.createElement("a");
            downloadLink.href = pngDataURL;
            downloadLink.download = "qr.png";
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(qr_svg);
    }
    // Otherwise, if the format is SVG, directly download the SVG content
    else if (format === "svg") {
        const svgData = new Blob([qr_svg], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgData);

        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "qr.svg";
        downloadLink.click();

        URL.revokeObjectURL(svgUrl);
    }
}


// Function to copy QR code PNG image to clipboard using WebExtension clipboard API
async function copyPngToClipboard() {
    try {
        // Get the PNG data URL from the button copy
        const pngDataURL = $buttonCopy.href;

        // Fetch the PNG data URL and convert it to an ArrayBuffer
        const pngArrayBuffer = await fetch(pngDataURL).then(response => response.arrayBuffer());

        // Copy the image data to the clipboard as PNG
        await browser.clipboard.setImageData(pngArrayBuffer, "png");

        // Log a success message to the console
        console.log("QR code PNG image copied to clipboard successfully.");
    } catch (error) {
        // Log an error message to the console if copying fails
        console.error("Error copying QR code PNG image to clipboard:", error);
    }
}


// Event listener for copying QR code PNG image when button is clicked
$buttonCopy.addEventListener("click", function () {
    // Call the copyPngToClipboard function when the button is clicked
    copyPngToClipboard();
});

// Retrieve URL and draw initial QR code
browser.tabs.query({ currentWindow: true, active: true })
    .then(function onGot(tabInfo) {
        const url = tabInfo[0].url;
        $text.value = url;
        drawQr(url);
    }, console.log);

// Event listeners
$text.addEventListener("input", function () {
    drawQr(this.value);
});

$text.addEventListener("focus", function () {
    this.select();
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

// Listen for console log event
console.log = function (message) {
    // Check if the log message indicates the successful copy operation
    if (message === "QR code PNG image copied to clipboard successfully.") {
        // Show the message div
        document.getElementById('message').style.display = 'block';

        // Hide the message after 1.5 seconds
        setTimeout(function () {
            document.getElementById('message').style.display = 'none';
        }, 1500);
    }
};



document.addEventListener("DOMContentLoaded", function () {
    const dropdownContainer = document.querySelector(".dropdown-container");
    const selector = dropdownContainer.querySelector(".selector");
    const dropdownMenu = dropdownContainer.querySelector(".dropdown-menu");
    const dropdownItems = dropdownContainer.querySelectorAll(".dropdown-item");
    const downloadButton = document.querySelector(".download-button");

    let selectedFormat = localStorage.getItem("selectedFormat") || "png"; // Default selected format

    // Function to trigger download based on format
    function downloadQRCode(format, qr_svg) {
        if (format === "png") {
            const pngData = new Blob([qr_svg], { type: "image/png" });
            const pngUrl = URL.createObjectURL(pngData);
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "qr.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else if (format === "svg") {
            const svgData = new Blob([qr_svg], { type: "image/svg+xml" });
            const svgUrl = URL.createObjectURL(svgData);
            const downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = "qr.svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    // Function to update download button
    function updateDownloadButton(format) {
        selectedFormat = format;
        localStorage.setItem("selectedFormat", format);
        downloadButton.innerHTML = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;"
            xml:space="preserve" class="download-icon">
            <style type="text/css">
                .st0 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 1;
                    stroke-miterlimit: 10;
                }

                .st1 {
                    fill: none;
                }

                .st2 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 1;
                    stroke-miterlimit: 10;
                }

                .st3 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 1;
                    stroke-linejoin: round;
                    stroke-miterlimit: 10;
                }

                .st4 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 1;
                    stroke-linecap: square;
                    stroke-linejoin: round;
                    stroke-miterlimit: 10;
                }
            </style>
            <g>
                <polyline class="st4" points="11.879,8.37 8,12.25 4.121,8.37 	" />
                <path class="st3" d="M14.25,12v2c0,0.69-0.56,1.25-1.25,1.25H3c-0.69,0-1.25-0.56-1.25-1.25v-2" />
                <line class="st3" x1="8" y1="12.25" x2="8" y2="1" />
                <rect class="st1" width="16" height="16" />
            </g>
        </svg>
        ${format.toUpperCase()}`;
    }


    // Toggle dropdown menu
    selector.addEventListener("click", function () {
        dropdownContainer.classList.toggle("open");
    });

    // Handle dropdown item selection
    dropdownItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const format = this.dataset.format;
            updateDownloadButton(format);
            dropdownContainer.classList.remove("open");
        });
    });

    // Handle download button click
    downloadButton.addEventListener("click", function () {
        // Replace `qr_svg` with your actual SVG QR code variable or data
        const qr_svg = $qr.querySelector("svg").outerHTML;
        // Trigger download based on selected format and pass the QR code SVG data
        downloadQRCode(selectedFormat, qr_svg);
    });

    // Initialize download button on page load
    updateDownloadButton(selectedFormat);
});

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