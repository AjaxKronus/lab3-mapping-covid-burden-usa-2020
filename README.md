# lab3-mapping-covid-burden-usa-2020

## US COVID-19 Mapping Dashboard, 2020

## Overview
Interactive web maps visualizing US COVID-19 impact in 2020:
- **map1.html**: Choropleth of infection rates (cases/100k).
- **map2.html**: Proportional symbols for total confirmed cases.

**Live maps**: [map1](https://[yourusername].github.io/[repo]/map1.html) | [map2](https://[yourusername].github.io/[repo]/map2.html)

![Map1 Screenshot](img/map1-screenshot.png)
![Map2 Screenshot](img/map2-screenshot.png)

## Key Features
- Albers equal-area projection (pre-applied to GeoJSON).
- Hover highlighting, clickable popups with stats.
- Custom legends (color classes for rates, sized examples for cases).
- Responsive design, mobile-friendly zoom.

## Libraries
- Leaflet.js (v1.9.4) for core mapping.
- OpenStreetMap/Esri basemaps.
- Native CSS/JS (no extras beyond lab).

## Data Sources
- US COVID-19 2020 state-level data (NY Times/Johns Hopkins via course shapefiles).
- GeoJSON: Converted/simplified via mapshaper.org (unused attrs deleted, shapes simplified 10%).

## Credits
- Adapted from GEOG458 Lab03 template (jakobzhao/geog458).
- Course: [GEOG XXX Lab Deliverable].

## Setup
1. Clone repo, upload your GeoJSON to `assets/`.
2. Enable GitHub Pages (Settings > Pages > Deploy from main).
3. View at `[username].github.io/[repo]/map1.html`.
