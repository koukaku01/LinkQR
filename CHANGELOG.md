# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note**: :star: indicate the version whcih has been published to the Firefox Add-ons site.

<hr> 

## [Unreleased]

<hr> 

## [Released]

##  :star: [0.10.0] 2024-05-12

### Added
- Added keyboard shortcut to open the LinkQR Popup for the current webpage.

## [0.9.0] 2024-05-12

### Added
- Browser menu item
  - Implemented a browser menu item with the title "Open LinkQR" to facilitate opening LinkQR.
  - The menu item appears in all contexts for easy access.
  - Clicking the menu item opens the page action popup, enhancing user experience.

## :star: [0.8.1] 2024-05-06

### Changed
- Adjusted the success message timeout to 1 second.

## [0.8.0] 2024-05-06

### Security

- Fix security vulnerability by properly sanitizing SVG content assignment. This change ensures that SVG content is safely inserted into the DOM, mitigating potential security risks associated with dynamic content insertion.

## [0.7.0] 2024-05-06

### Added
- Added message div with SVG icon to provide visual feedback for successfully copied the QR Code into Clipboard.

## [0.6.1] 2024-05-05

### Fix
- Added JavaScript snippet to disable default zoom behavior in popup body when Ctrl key is pressed during scrolling.

## [0.6.0] 2024-05-05

### Changed
- Revamped UI for improved user experience
