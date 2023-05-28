import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const MapComponent = () => {
  const [layerNames, setLayerNames] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [currentLayer, setCurrentLayer] = useState(null);

  useEffect(() => {
    fetchLayerNames();
  }, []);

  const fetchLayerNames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tableNames');
      const layerNames = await response.json();
      setLayerNames(layerNames);
    } catch (error) {
      console.error('Error fetching layer names:', error);
    }
  };

  const handleLayerClick = async (tableName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tableData/${tableName}`);
      const geojson = await response.json();
      setSelectedLayer(geojson);
      setCurrentLayer(tableName);
    } catch (error) {
      console.error(`Error fetching layer data for ${tableName}:`, error);
    }
  };

  const handleLayerHover = (tableName) => {
    setHoveredLayer(tableName);
  };

  const handleLayerLeave = () => {
    setHoveredLayer(null);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Layer Names</h2>
        <ul className="layer-names">
          {layerNames.map((tableName) => (
            <li
              key={tableName}
              onClick={() => handleLayerClick(tableName)}
              onMouseEnter={() => handleLayerHover(tableName)}
              onMouseLeave={handleLayerLeave}
              className={`layer-item ${tableName === hoveredLayer ? 'active' : ''}`}
            >
              <div className="layer-item-content">
                <span className="layer-item-label">{tableName}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="map-container">
        {typeof window !== 'undefined' ? (
          <MapContainer center={[30.3, 69.3]} zoom={4} className="map-placeholder">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {selectedLayer && (
              <GeoJSON key={currentLayer} data={selectedLayer} />
            )}
          </MapContainer>
        ) : (
          <div className="map-placeholder">Loading map...</div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;