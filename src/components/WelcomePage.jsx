import React from 'react';
import './WelcomePageStyle.css';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <h1>Välkommen till Doggy Daycare</h1>
      <p>Vi tar hand om dina älskade hundar!</p>
      <a href="/#/catalog" className="btn">Se våra hundar</a>
    </div>
  );
}

export default WelcomePage