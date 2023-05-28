// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to the Map Shop!</h1>
      <p className="description">
        Maps for all your needs. Plan a trip, decorate your home & explore new places.
      </p>
      <div className="maps-section">
        <h2 className="section-title">Types of Maps We Serve</h2>
        <ul className="map-types-list">
          <li>World Maps</li>
          <li>City Maps</li>
          <li>Topographic Maps</li>
        </ul>
      </div>
      <div className="data-sources-section">
        <h2 className="section-title">Prominent Data Sources</h2>
        <ul className="data-sources-list">
          <li>OpenStreetMap</li>
          <li>Google Maps</li>
          <li>NASA Earth Observing System</li>
        </ul>
      </div>
      <Link to="/data">
        <button className="explore-button">Explore</button>
      </Link>
    </div>
  );
};

export default Home;
