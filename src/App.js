import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventRegistrationForm from './components/createEvent';
import Navbar from './components/navbar';
import Register from './components/register';
import Home from './components/home';
import EventDetails from './components/eventDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-event" element={<EventRegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
