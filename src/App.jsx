import './App.css';

import React, { useState } from 'react';

import { DataProvider } from './DataContext';
import PageOne from './Page1';
import PageTwo from './Page2';
import PageThree from './Page3';
import PageFour from './Page4';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
          <Route path="/page-three" element={<PageThree />} />
          <Route path="/page-four" element={<PageFour />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}
export default App;
