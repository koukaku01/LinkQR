// DOM elements
const $text = document.querySelector(".inputbar"); // Input field for text
const $qr = document.querySelector(".qr"); // Container for QR code display
const $buttonCopy = document.querySelector(".buttonCopy"); // Button to copy QR code PNG image
const SIZE = 798; // Size of the QR code

// Function to draw QR code
function drawQr(text) {
    // QR code colors
    let fg = "#2a2a2e"; // Foreground color
    let bg = "#f9f9fa"; // Background color

    // Generate SVG QR code
    const qr = new QRCode({
        content: text || "https://www.youtube.com/watch?v=FtutLA63Cp8", // Text content
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

// Retrieve URL from the background script and draw the initial QR code
browser.runtime.sendMessage({ request: "getLinkUrl" }).then((response) => {
    let url;
    if (response.linkUrl) {
        url = response.linkUrl;
    } else {
        return browser.tabs.query({ currentWindow: true, active: true });
    }
    return Promise.resolve([{ url: url }]);
}).then((tabInfo) => {
    const url = tabInfo[0].url;
    $text.value = url;
    drawQr(url);
}).catch(console.error);

// Send a message to the background script to clear the link URL
browser.runtime.sendMessage({ request: "clearLinkUrl" });


// Event listeners
$text.addEventListener("input", function () {
    drawQr(this.value);
});

$text.addEventListener("focus", function () {
    this.select();
});

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



// Event listeners
$text.addEventListener("input", function () {
    drawQr(this.value);
});

$text.addEventListener("focus", function () {
    this.select();
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

// Handle download and selector for formats
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

        // Clear existing content
        while (downloadButton.firstChild) {
            downloadButton.removeChild(downloadButton.firstChild);
        }

        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("version", "1.1");
        svg.setAttribute("id", "Layer_1");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.setAttribute("x", "0px");
        svg.setAttribute("y", "0px");
        svg.setAttribute("width", "16px");
        svg.setAttribute("height", "16px");
        svg.setAttribute("viewBox", "0 0 16 16");
        svg.setAttribute("style", "enable-background:new 0 0 16 16;");
        svg.setAttribute("xml:space", "preserve");
        svg.setAttribute("class", "download-icon");

        // Define SVG content
        svg.innerHTML = `
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
    `;

        // Append SVG to downloadButton
        downloadButton.appendChild(svg);

        // Append text content
        downloadButton.appendChild(document.createTextNode(format.toUpperCase()));
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

