# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/Amsterdam/bereikbaarheid-frontend/compare/v2.2.1...HEAD)

### Added
- Load-Unload: address search
- Load-Unload: road sections with load-unload information

### Changed
- Load-Unload: increase max zoom level to 21

### Fixed
- Prohibitory signs: prevent undefined maxAllowedWeight for vehicle


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
