window.onload = function() {

var myMap;

function createFeatures(earthquakeData) {
  console.log(earthquakeData); // log earthquakeData to the console to check if it is received correctly
  // Define a function to run once for each feature in the features array
  // Give each feature a popup describing the place, time, and magnitude of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>Magnitude: " + feature.properties.mag + "</p><p>Depth: " + feature.geometry.coordinates[2]);
  }

  // Define a function to create circle markers for each feature in the features array
  function pointToLayer(feature, latlng) {
    var markerSize = feature.properties.mag * 5; // Multiply magnitude by a factor to get marker size
    var fillColor = getColor(feature.geometry.coordinates[2]); // Get color based on depth (the third coordinate)

    var geojsonMarkerOptions = {
      radius: markerSize,
      fillColor: fillColor,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    return L.circleMarker(latlng, geojsonMarkerOptions);
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: pointToLayer
  });

  // Send earthquakes layer to the createMap function
  createMap(earthquakes);
  createLegend();
}

// Define the createLegend function
function createLegend() {
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 10, 20, 40, 80],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    console.log(div.innerHTML)
    return div;
  };

  legend.addTo(myMap);
}


// Define a function to get the color for a given depth
function getColor(d) {
    return d > 80 ? '#ea2c2c' :
           d > 40 ? '#ea822c' :
           d > 20 ? '#ee9c00' :
           d > 10 ? '#eecc00' :
           d > 5 ? '#d4ee00' :
                    '#98ee00';
}

function createMap(earthquakes) {
  // Define streetmap layer
  var streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
    maxZoom: 18
  });

  // Define a baseMaps object to hold base layers
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create overlay object to hold overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create a new map object
  myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, earthquakes] // Add streetmap and earthquakes layers as default
  });

  // Add the control layers to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false // Show the control layers expanded by default
  }).addTo(myMap);
}

// API endpoint for earthquake data (replace URL with the URL of the GeoJSON data you want to visualize)
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data.features[0]);
    createFeatures(data.features);
  });

// End of window.onload function
}