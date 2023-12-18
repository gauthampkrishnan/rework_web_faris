import './App.css';
import Header from './Header';
import PersonalInfo from './PersonalInfo';
import EventInfo from './EventInfo';
import React, { useState } from 'react';

import { DataProvider } from './DataContext';
import SubmitButton from './Submit';
import PageOne from './Page1';
import PageTwo from './Page2';
import PageThree from './Page3';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/page-three" element={<PageThree />} />
      </Routes>
    </Router>
  );
}

//   return(
//   // <DataProvider>
//   <>
//   <PageOne/>
//       {/* <Header />
//       <PersonalInfo />
//       <EventInfo />
// <SubmitButton/>
//     </> */}
//     {/* </DataProvider> */}
//   )

// }

export default App;
