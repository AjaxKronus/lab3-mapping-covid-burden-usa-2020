# US COVID-19 Mapping Dashboard, 2020

## Overview
Interactive web maps visualizing US COVID-19 impact in 2020 using Leaflet:

- **[map1.html](https://ajaxkronus.github.io/lab3-mapping-covid-burden-usa-2020/map1.html)**: Choropleth map of infection rates (cases per 100k population) by state.
- **[map2.html](https://ajaxkronus.github.io/lab3-mapping-covid-burden-usa-2020/map2.html)**: Proportional symbol map of total confirmed cases by state.

![Map 1 - COVID Rates Choropleth](img/map1-screenshot.png)
![Map 2 - COVID Cases Proportional Symbols](img/map2-screenshot.png)

## Key Features
- **Albers equal-area projection** (US National Atlas Equal Area, EPSG:5070) for accurate area comparisons.
- **Hover interaction**: Highlight polygons/circles with smooth transitions.
- **Clickable popups**: State name, rates, total cases with formatted numbers.
- **Custom legends**: 7-class colors for rates; scaled circle examples for case counts.
- **Responsive design**: Mobile-friendly zoom/pan.
- **Optimized GeoJSON**: Shapes simplified 15% via mapshaper.org, unused attributes removed.

## Technical Implementation
**Primary functions** (beyond lab03 template):
- Dynamic radius scaling: `Math.sqrt(total_cases) / 30` prevents oversized symbols.
- Dual legends with CSS-styled circle markers.
- Fetch API for async GeoJSON loading.

**Libraries:**
- Leaflet.js v1.9.4 (core mapping)
- OpenStreetMap + Esri basemaps
- Vanilla CSS/JS (no frameworks)

## Data Sources
- **US COVID-19 2020 state data**: NY Times / Johns Hopkins University (course-provided shapefiles).
- **Processing**: Shapefiles → simplified GeoJSON via [mapshaper.org](https://mapshaper.org/) (10-20% simplification, kept: `NAME`, `total_cases`, `rate_per_100k`).
- Files: `assets/us-covid-2020-counts.geojson` (1.2MB), `assets/us-covid-2020-rates.geojson` (1.1MB).

## Credits & Acknowledgments
- Adapted from [GEOG458 Lab03 template](https://github.com/jakobzhao/geog458/tree/master/labs/lab03).
- Instructor: Bo Zhao (jakobzhao).
- Leaflet documentation: [Choropleth example](https://leafletjs.com/examples/choropleth/).
- Hosted via GitHub Pages.

---

