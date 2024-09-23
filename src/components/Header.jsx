import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderStyle.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Doggy Care</h1>
      </div>
      
      {/* Hamburger button for mobile */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="hamburger-icon">&#9776;</span>
      </button>

      {/* Desktop menu */}
      <nav className={`header-right`}>
        <Link className="btn" to="/" onClick={() => setMenuOpen(false)}>Start</Link>
        <Link className="btn" to="/catalog" onClick={() => setMenuOpen(false)}>Kunder</Link>
        <Link className="btn" to="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mobile-menu">
          <Link className="mobile-link" to="/" onClick={() => setMenuOpen(false)}>Start</Link>
          <Link className="mobile-link" to="/catalog" onClick={() => setMenuOpen(false)}>Kunder</Link>
          <Link className="mobile-link" to="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>
        </nav>
      )}
    </header>
  );
}

export default Header