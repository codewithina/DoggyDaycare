import React from 'react';
import './ContactPageStyle.css';

const ContactPage = () => {

  const handleScroll = (e) => {
    e.preventDefault(); 
    const contactSection = document.getElementById("contact-section");
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h2>Kontakta oss</h2>
        <h1>
Ring oss, kontakta vårt team via formuläret nedan, eller boka ditt husdjurs vistelse direkt på hemsidan.
        </h1>
        <a href="#contact-section" className="scroll-button" onClick={handleScroll}>Skrolla ned</a>
      </div>

      {/* Contact Form Section */}
      <div id="contact-section" className="contact-section">
        <form className="contact-form">
          <h2>Kontakta Oss</h2>

          <label htmlFor="name">Namn</label>
          <input type="text" id="name" name="name" placeholder="" required />

          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="" required />

          <label htmlFor="subject">Ämne</label>
          <input type="text" id="subject" name="subject" placeholder="" required />

          <label htmlFor="message">Meddelande</label>
          <textarea id="message" name="message" placeholder="Skriv här" rows="5" required></textarea>

          <button type="submit">Skicka</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage