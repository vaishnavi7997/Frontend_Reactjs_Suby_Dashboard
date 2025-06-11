import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import NotFound from './vendorDashboard/components/NotFound';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element= { <LandingPage ></LandingPage>} />
        <Route path="/*" element= {<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App
