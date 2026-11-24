
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

        {/* Campaign Wordmark */}
        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-mark">M</span>

          <span className="logo-text">
            MARTIN
            <strong>FUSA<span>.</span></strong>
            <small>UMOJA 2 · MCA</small>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </nav>

        {/* Campaign CTA */}
        <a href="#support" className="navbar-cta">
          <span>Support Martin</span>
          <ArrowUpRight size={17} />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={closeMenu}>
            {link.name}
          </a>
        ))}

        <a href="#support" className="mobile-support" onClick={closeMenu}>
          Support Martin <ArrowUpRight size={17} />
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
