
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Martin', href: '#about' },
    { name: 'Manifesto', href: '#manifesto' },
    { name: 'Your Voice', href: '#your-voice' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* MF CAMPAIGN MONOGRAM */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="Martin Fusa - Home"
        >
          <span className="logo-mark">
            <span>M</span>
            <span>F</span>
          </span>

          <span className="logo-tagline">
            Together for a
            <strong>Better Umoja.</strong>
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </nav>

        {/* CAMPAIGN CTA */}
        <a href="#support" className="navbar-cta">
          <span>Support Martin</span>
          <ArrowUpRight size={17} />
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

      </div>

      {/* MOBILE NAVIGATION */}
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.name}
          </a>
        ))}

        <a
          href="#support"
          className="mobile-support"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          Support Martin
          <ArrowUpRight size={17} />
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
