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
          <Route path="venues" element={<Venues />} />
          <Route path="venue/:id" element={<Venue />} />
          <Route path="profile/:name" element={<Profile />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
