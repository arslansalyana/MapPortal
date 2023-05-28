import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import Data from './components/Data';
import WMSComponent from './components/wms';
import WFSComponent from './components/wfs';



function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} />
          <Route path="/data" element={<Data />} />
          <Route path="/wms" element={<WMSComponent />} />
          <Route path="/wfs" element={<WFSComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;