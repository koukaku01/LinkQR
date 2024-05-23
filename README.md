<div align="center"> <!-- flex method does not work-->
    <img src="src/icons/ext-icon-64.png" alt="LinkQR icon">
    <h1>LinkQR</h1>
	
[![Extension Version](https://img.shields.io/badge/Version-0.11.0-blue)](https://github.com/xKe00/LinkQR/blob/main/manifest.json) [![License](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)

[Changelog](./CHANGELOG.md)

</div>

LinkQR is a Firefox extension that simplifies the process of converting web links into QR codes with just a single click. It empowers users to effortlessly copy or download QR codes in PNG/SVG format for convenient sharing. It works completely offline and local.

<div style="display: flex; flex-direction: column;">
    <img src="assets/presentation-1.png" alt="Presentation 1" style="width: 100%;">
    <img src="assets/presentation-2.png" alt="Presentation 2" style="width: 100%;">
</div>

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
	- [Browser address bar button](#browser-address-bar-button)
    - [Right-clicked context menu](#right-clicked-context-menu)
    - [Keyboard shortcuts](#keyboard-shortcuts)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

- [x] Generates QR code from current tab URL
- [x] Extension icon located at the end of the address bar
- [x] Option to download QR Code as PNG or SVG
- [x] Offline support
- [x] Automatically adapts to user's Firefox theme (light or dark)
- [x] Ability to copy QR code as PNG
- [x] Right-click context menu to generate QR code

### TODO
- [ ] Right-click context menu to generate QR code for links

## Install

[![Get the add-on at the Firefox Add-ons site](assets/get-the-add-on.png)](https://addons.mozilla.org/firefox/addon/link-qr/)<br>
Available on the [Firefox Add-ons site](https://addons.mozilla.org/firefox/addon/link-qr/)


## Usage

### Browser address bar button

Click the button located to the right of the browser's address bar to open up the popup which contains the QR Code of the current webpage, with options to download or copy.

### Right-clicked context menu

Right-click anywhere on a webpage to access the context menu. You'll find an option labeled "Open LinkQR" in the menu. Click on it to open the popup containing the QR Code of the current webpage

### Keyboard shortcuts

- Alt+Q: Open the LinkQR Popup for current webpage.


## Maintainers

[@xKe00](https://github.com/xKe00).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/xKe00/LinkQR/issues/new) or submit PRs.

LinkQR follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## Acknowledgements

 * [firefox-qr](https://github.com/pudymody/firefox-qr?tab=readme-ov-file#about-the-project) - Used for generating QR codes in the Firefox browser extension.

## License

[LinkQR](https://github.com/xKe00/LinkQR) Copyright &#169; 2024 [xKe00](https://github.com/xKe00).

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](LICENSE) for more information.
