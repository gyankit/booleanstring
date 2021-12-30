import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home'
import Auth from './pages/Auth';
import User from './pages/User';
import Verify from './pages/Verify';
import Profile from './pages/Profile'
import DataEntry from './pages/DataEntry'
import BooleanString from './pages/BooleanString'

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/:slag" element={<BooleanString />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dataentry" element={<DataEntry />} />
        <Route path="/verification" element={<Verify />} />
        <Route path="/Authentication" element={<Auth />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
