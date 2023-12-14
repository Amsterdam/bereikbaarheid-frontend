# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v3.1.0...HEAD)

## Added

## Changed

## Fixed

## [v3.2.0 - 2023-12-14](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v3.1.0...v3.2.0)

### Changed

- Touringcar: legend labels
- Touringcar: text about situation in 2024
- Touringcar: stop and parking space tables are now sorted

## [v3.1.0 - 2023-12-07](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v3.0.0...v3.1.0)

### Added

- "Touringcar" page (unlinked) with all its legend items (as seen on tourbuzz.amsterdam.nl)
- Fetch and display bollards on map
- Bollard details can be viewed in the map panel and in tooltips
- Internationalization with i18next
- Translations for many UI elements to Dutch, English, German and Spanish (but there is not yet a way for the user to switch languages)
- Fallback language is Dutch (nl_NL)
- Frequently Asked Questions (FAQ) on contact & help page
- Default Amsterdam municipality favicons and app icons for various platforms (Android, iOS, Windows)

### Changed

- New lay-out and content for forbidden to stop and park signs on parking spaces on the load-unload page

### Fixed

- Replaced dead or old links

## [v3.0.0 - 2023-10-16](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.7.0...v3.0.0)

### Added

- Forbidden to park or stop traffic signs to each window time row in table
- Analytics with Piwik PRO: currently only tracking page visits
- Landing page with cards (corresponds to main menu)
- New pages: Data Sources and Contact and assistance

### Changed

- Bereikbaarheid API URL
- Updated routes and main menu with new links and naming

## [v2.7.0 - 2023-10-11](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.6.0...v2.7.0)

### Added

- Parking and stopping forbidden signs
- Test for parking sign

### Changed

- Upgrade and audit-fix packages

### Fixed

- Upgrade Node to version 18
- Raise drawer content above its UI
- Increase timeouts in some tests

## [v2.6.0 - 2023-06-13](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.5.0...v2.6.0)

### Added

- Prohibitory signs: add test suite

### Changed

- Switch to non-root nginx docker image

### Fixed

- updated dependencies to latest minor and patch versions

## [v2.5.0 - 2023-05-15](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.4.0...v2.5.0)

### Added

- Load-Unload: add test suite
- Road obstructions: add test suite
- Road section: add test suite

### Fixed

- updated dependencies to latest minor and patch versions
- updated `@hookform/resolvers` to version 3

## [v2.4.0 - 2023-02-26](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.3.0...v2.4.0)

### Added

- Header menu: add links to the three main pages

### Changed

- Header menu: make the menu usable on mobile devices

### Fixed

- Prohibitory signs: display results when no address given

## [v2.3.0 - 2023-02-17](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.2.1...v2.3.0)

### Added

- Load-Unload: address search
- Load-Unload: road sections with load-unload information
- Load-Unload: one-way traffic indicators
- Data menu item: provides an overview of the used data on a page

### Changed

- Load-Unload: increase max zoom level of the map to 21

### Fixed

- Prohibitory signs: prevent vehicles with an undefined maximum allowed weight from using the app

## [v2.2.1 - 2022-12-15](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.2...v2.2.1)

Updated minor and patch dependencies.

## v2.2 - 2022-12-09

This release makes the code available through Github, and semantic versioning has been adopted.

### Added

- Load-Unload page at `/laden-lossen`

### Changed

- default font to Amsterdam Sans

The versions below this line are for historical reasons. The application was open-sourced with version 2.2, so only tags >= v2.2 are available in this repository.

## v2.1 - 2022-10-14

### Added

- Road obstructions: show indirect unaccessible road sections
- Road obstructions: add WIOR projects
- Migrate to React

### Fixed

- Prohibitory signs: overflow of traffic sign exception text in sidebar
- Prohibitory signs: reset location or trafficSign variables on click

## v2.0 - 2022-06-13

### Added

- Road obstructions page at `/stremmingen`

## v1.9 - 2022-05-30

### Added

- Road section: add a map

### Changed

- synced styling LoadUnload spaces map layer with [colors used in mapserver repo](https://github.com/Amsterdam/mapserver)

## v1.8 - 2022-05-11

### Added

- Prohibitory signs: add load-unload spaces
- Road section: add road obstructions

### Changed

- Prohibitory signs: improve data.amsterdam.nl hyperlink
- Prohibitory signs: link link id to road section page

### Fixed

- Prohibitory signs: take vehicle type into account when determining permit low emission zone

## v1.7 - 2022-03-21

### Added

- Prohibitory signs: add ability to indicate a vehicle with a trailer

### Changed

- Prohibitory signs: feedback email address
- Prohibitory signs: improve wording

### Fixed

- Prohibitory signs: replace test vehicle Bus Euro 5
- Prohibitory signs: display one-way arrows map layer on top of prohibitory roads

## v1.6 - 2022-01-27

### Added

- Road section page with traffic counts
- Prohibitory signs: add link to amsterdam.nl page with info about wide roads
- Prohibitory signs: add link to amsterdam.nl page with info about heavy-goods vehicles and low emission zones

### Changed

- Prohibitory signs: feedback email address
- Prohibitory signs: adjust low emission zone to requirements 2022
- Prohibitory signs: update wide roads legend

## v1.5 - 2021-12-01

### Added

- full address search
- explanation of term RVV
- default vehicle height in case of a car
- link header logo

### Changed

- improve feedback in case of no address
- replace sample truck euro 2

### Fixed

- take electric vehicles into account when parsing emission standard

## v1.4 - 2021-11-01

### Added

- highlight exception traffic sign in sidebar
- legend traffic signs

### Changed

- add bounding boxes to map tiles
- improve visualization zonal traffic signs

## v1.3 - 2021-10-02

### Added

- Location-based permits
  - show distance to address in sidebar
  - show a marker on the map for which the permits apply
- SiteImprove analytics
- Wide roads

### Changed

- improve feedback UX
- disable browsers AutoFill feature on address inputs
- also show RVV permit link when no address is provided

### Fixed

- exclude trailers when validating license plate

## v1.2 - 2021-09-06

### Added

- disclaimer
- feedback modal
- location-based permits in sidebar
- validate form input
- sample license plate Bus euro 5

### Changed

- visualize traffic signs differently depending on zoom level

### Fixed

- fix bug in detecting Bus when determining permits
- improve display RDW info in case of empty values

## v1.1 - 2021-08-06

Second public beta used for 2nd round of UX sessions.

## v1.0 - 2021-06-30

First public beta used for 1st round of UX sessions.
