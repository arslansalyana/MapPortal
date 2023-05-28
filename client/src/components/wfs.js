import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const WFSComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the Leaflet map
    mapRef.current = L.map('map').setView([37.0902, -95.7129], 4); // Set initial center and zoom level

    // Add a TileLayer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Fetch and render the WFS layer from GeoServer
    fetch('http:8000/localhost:geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp/states&maxFeatures=50&outputFormat=application/json')
      .then((response) => response.json())
      .then((data) => {
        // Create a GeoJSON layer and add it to the map
        L.geoJSON(data, {
          style: {
            color: 'blue',
            weight: 2,
            fillOpacity: 0.2,
          },
        }).addTo(mapRef.current);
      });

    return () => {
      // Cleanup map when the component unmounts
      mapRef.current.remove();
    };
  }, []);

  return <div id="map" style={{ height: '600px' }}></div>;
};

export default WFSComponent;