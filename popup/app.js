// DOM elements
const $text = document.querySelector(".inputbar"); // Input field for text
const $qr = document.querySelector(".qr"); // Container for QR code display
const $downloadPngBtn = document.getElementById("downloadPngBtn"); // PNG download button
const $downloadSvgBtn = document.getElementById("downloadSvgBtn"); // SVG download button
const $buttonCopy = document.querySelector(".buttonCopy"); // Button to copy QR code PNG image
const SIZE = 800; // Size of the QR code

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
    $qr.innerHTML = qr_svg;

    // Update PNG download link
    $downloadPngBtn.addEventListener("click", function () {
        const pngData = new Blob([qr_svg], { type: "image/png" });
        const pngUrl = URL.createObjectURL(pngData);
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    // Update SVG download link
    $downloadSvgBtn.addEventListener("click", function () {
        const svgData = new Blob([qr_svg], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgData);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "qr.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

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
