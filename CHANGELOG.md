# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note**: :star: indicate the version whcih has been published to the Firefox Add-ons site.

## [Unreleased]

## [Released]

## [0.12.0] - 2024-05-24

### Added
- **Download Button Enhancement**:
  - Combined separate PNG and SVG download buttons into a single button with a dropdown selector for format.
  - Implemented functionality to save user choice of download format into storage.

### Changed
- **User Interface**:
  - Made slight improvements to the UI for a better user experience.

### Fixed
- Minor bug fixes and improvements to enhance stability and performance.

## [0.11.0] - 2024-05-23

### Added
- **Internationalization (i18n)**:
  - Added `_locales` directory with localization files for supported languages.
  - Updated HTML title text to use localized strings, enabling support for multiple languages.

### Changed
- **Directory Structure**:
  - Restructured project directory to improve organization and maintainability.
  - Moved files and directories to align with best practices for extension development.

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
