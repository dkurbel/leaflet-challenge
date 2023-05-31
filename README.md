# leaflet-challenge

## Earthquake Visualization
### This project aims to visualize earthquake data using Leaflet.js library. It fetches earthquake data from the USGS (United States Geological Survey) API and displays it on an interactive map.

## Prerequisites
#### Internet connection to fetch earthquake data from the USGS API.
#### Web browser with JavaScript enabled.

## Getting Started
#### Download or clone the project repository.
#### Open the index.html file in a web browser.

## Project Structure
#### The JavaScript file logic.js is located in the static folder.
#### The HTML file index.html is in the root folder.

## Libraries Used
#### Leaflet.js (v1.7.1) - A JavaScript library for interactive maps.
#### D3.js (v3) - A JavaScript library for manipulating documents based on data.

## Usage
#### Upon opening index.html, the JavaScript code in logic.js will be executed.
#### The script fetches earthquake data from the USGS API and creates a map with markers representing the earthquakes.
#### Each marker provides information about the place, time, magnitude, and depth of the earthquake.
#### The map also includes a legend indicating the depth ranges with corresponding colors.

## Customization
#### To change the source of earthquake data, modify the queryUrl variable in logic.js with the desired API endpoint.
#### You can customize the map appearance by modifying the options in the pointToLayer and createMap functions in logic.js.
#### Additional styling can be applied to the map and legend using CSS in the index.html file.

## Attribution
#### The street map tiles used in the project are provided by OpenStreetMap contributors.
#### The earthquake data is obtained from the USGS (United States Geological Survey) API.

## License
#### This project is licensed under the MIT License.
