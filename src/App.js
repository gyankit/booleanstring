import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/header';
import PageNotFound from './pages/pageNotFound';
import Home from './pages/home'
import Login from './pages/login';
import User from './pages/user';
import Verify from './pages/verify';
import Profile from './pages/profile'
import DataEntry from './pages/data-entry'
import AuthContext from './helper/context'
import { setSession, unSetSession, getSession, isSessionSet } from './helper/session'

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState(getSession());
  const [searchValue, setSearchValue] = useState(false);

  const login = async (usr) => {
    usr.loginTime = new Date().toISOString();
    setSession(usr)
    setUser(getSession());
    navigate('/');
  }

  const logout = async () => {
    unSetSession();
    setUser(getSession());
    navigate('/');
  }

  const isLoggedIn = () => {
    if (isSessionSet()) {
      const usr = getSession();
      if (user._id === usr._id && user.type === usr.type && user.token === usr.token && user.expire === usr.expire && user.loginTime === usr.loginTime) {
        const currentTime = new Date();
        const expireTime = new Date(new Date(user.loginTime).getTime() + (user.expire * 60 * 60 * 1000));
        if (expireTime >= currentTime) {
          return true;
        }
        logout();
      }
    }
    return false;
  }

  const getUser = (key) => {
    if (isLoggedIn()) {
      return user[key];
    }
    return undefined;
  }

  const changeSearch = () => {
    setSearchValue(!searchValue);
  }

  return (
    <AuthContext.Provider value={{ user: user, isLoggedIn: isLoggedIn, getUser: getUser }}>
      <Header search={changeSearch} logout={logout} />
      <Routes>
        <Route exact path="/" element={<Home search={searchValue} />} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/data-entry" element={<DataEntry />} />
        <Route exact path="/verification" element={<Verify />} />
        <Route exact path="/authentication" element={<Login login={login} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
