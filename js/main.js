// Choropleth functions
function getColorRates(d) {
    return d > 8000 ? '#800026' :
           d > 6000 ? '#BD0026' :
           d > 4000 ? '#E31A1C' :
           d > 2000 ? '#FC4E2A' :
           d > 1000 ? '#FD8D3C' :
           d > 500   ? '#FEB24C' :
           d > 100   ? '#FED976' :
                      '#FFEDA0';
}

function styleRates(feature) {
    return {
        fillColor: getColorRates(feature.properties.rate_per_100k),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function onEachFeatureRates(feature, layer) {
    layer.bindPopup(`
        <b>${feature.properties.NAME || 'State'}</b><br/>
        Cases per 100k: ${feature.properties.rate_per_100k.toLocaleString()}<br/>
        Total cases: ${feature.properties.total_cases?.toLocaleString() || 'N/A'}
    `);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

function loadChoropleth(map, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            L.geoJson(data, {
                style: styleRates,
                onEachFeature: onEachFeatureRates
            }).addTo(map);
            addLegendRates(map);
        });
}

// Proportional symbols functions
function pointToLayerCounts(feature, latlng) {
    var cases = feature.properties.total_cases || 0;
    var radius = cases > 0 ? Math.sqrt(cases) / 30 : 0; // Scale appropriately
    return L.circleMarker(latlng, {
        radius: radius,
        fillColor: '#f03',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    });
}

function onEachFeatureCounts(feature, layer) {
    layer.bindPopup(`
        <b>${feature.properties.NAME || 'State'}</b><br/>
        Total cases: ${feature.properties.total_cases.toLocaleString()}<br/>
        Rate per 100k: ${feature.properties.rate_per_100k?.toLocaleString() || 'N/A'}
    `);
}

function loadProportionalSymbols(map, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            L.geoJson(data, {
                pointToLayer: pointToLayerCounts,
                onEachFeature: onEachFeatureCounts
            }).addTo(map);
            addLegendCounts(map);
        });
}

// Shared utilities
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
    });
    layer.bringToFront();
}

function resetHighlight(e) {
    // Reset style (call the appropriate style function or default)
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    });
}

// Legends
function addLegendRates(map) {
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 500, 1000, 2000, 4000, 6000, 8000],
            labels = [];
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColorRates(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
}

function addLegendCounts(map) {
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
            sizes = [10000, 100000, 500000],
            labels = [];
        sizes.forEach(function(size) {
            div.innerHTML += 
                '<div><i style="display: inline-block; width: ' + (Math.sqrt(size)/30 * 10) + 'px; height: ' + (Math.sqrt(size)/30 * 10) + 'px; background: #f03; border: 1px solid #000; border-radius: 50%;"></i> ' + size.toLocaleString() + '</div>';
        });
        div.innerHTML += '<div><i style="...">0</i></div>'; // Add zero case
        return div;
    };
    legend.addTo(map);
}
