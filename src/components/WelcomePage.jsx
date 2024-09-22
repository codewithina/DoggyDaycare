import React from 'react';
import './WelcomePageStyle.css';
import videoBackground from '../assets/hund-video.mp4';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <video autoPlay muted loop className="background-video">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h1>Doggy Daycare</h1>
        <p>Vi tar hand om dina fyrbenta vänner med massor av kärlek och omsorg.</p>
        <div className="hero-buttons">
        <Link to="/catalog" className="btn">Utforska Våra Hundar</Link>
        <Link to="/contact" className="btn">Kontakta Oss</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage