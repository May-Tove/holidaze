import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import {
  Home,
  Venues,
  Venue,
  Contact,
  About,
  Login,
  Register,
  NotFound,
  Profile,
} from './pages/index';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Venues" element={<Venues />} />
          <Route path="Venue/:id" element={<Venue />} />
          <Route path="Profile/:name" element={<Profile />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="About" element={<About />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
