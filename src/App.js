import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/header';
import Home from './pages/home'
import Login from './pages/login';
import User from './pages/user';
import Verify from './pages/verify';
import Profile from './pages/profile'
import DataEntry from './pages/data-entry'

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/data-entry" element={<DataEntry />} />
        <Route path="/verification" element={<Verify />} />
        <Route path="/authentication" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
