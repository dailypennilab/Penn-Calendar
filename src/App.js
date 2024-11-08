import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventRegistrationForm from './components/createEvent';
import Navbar from './components/navbar';
import Register from './components/register';
import Home from './components/home';
import Login from './components/login';
import EventDetails from './components/eventDetails';
import Profile from './components/profile';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './components/protectedRoute';
import Footer from './components/footer';
import './App.css';  /* Make sure to import your CSS file */

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/create-event" element={
                <ProtectedRoute> <EventRegistrationForm /> </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute> <Profile /> </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;