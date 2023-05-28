import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const WMSComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the Leaflet map
    mapRef.current = L.map('map').setView([37.0902, -95.7129], 4); // Set initial center and zoom level

    // Add a TileLayer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Fetch and render the WMS layer from GeoServer
    L.tileLayer.wms('http://localhost:8000/geoserver/topp/wms', {
      layers: 'topp:states',
      format: 'image/png',
      transparent: true,
      version: '1.1.0',
      attribution: 'Data © OpenStreetMap contributors',
    }).addTo(mapRef.current);

    return () => {
      // Cleanup map when the component unmounts
      mapRef.current.remove();
    };
  }, []);

  return <div id="map" style={{ height: '600px' }}></div>;
};

export default WMSComponent;