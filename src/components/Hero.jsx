
import { motion } from 'framer-motion';
import { ArrowRight, FileText, MapPin } from 'lucide-react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-glow hero-glow-blue"></div>
      <div className="hero-glow hero-glow-red"></div>

      <div className="hero-container">

        {/* LEFT: Campaign Introduction */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="hero-label">
            <span className="status-dot"></span>
            <MapPin size={12} />
            MCA ASPIRANT · UMOJA 2 WARD
          </div>

          <h1>
            Martin
            <span>Fusa<span className="hero-period">.</span></span>
          </h1>

          <h2>Together for a Better Umoja.</h2>

          <p className="hero-description">
            A fresh voice with a simple promise:
            listen first, then deliver for every
            resident in Umoja 2.
          </p>

          <div className="hero-actions">
            <a href="#support" className="hero-btn hero-btn-primary">
              Support Martin
              <ArrowRight size={17} />
            </a>

            <a href="#manifesto" className="hero-btn hero-btn-secondary">
              <FileText size={16} />
              Read the Manifesto
            </a>
          </div>

          <div className="hero-bottom-note">
            <span className="hero-note-line"></span>
            <span>YOUR VOICE. YOUR WARD. OUR FUTURE.</span>
          </div>

        </motion.div>

        {/* RIGHT: Candidate Photograph */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >

          <div className="hero-image-glow"></div>

          <div className="hero-image-frame">

            <img
              src="/images/martin-fusa.png"
              alt="Martin Fusa, MCA aspirant for Umoja 2 Ward"
              className="hero-image"
            />

            <div className="hero-image-top-label">
              TUNASONGA
            </div>

            <div className="hero-image-bottom-label">
              MCA ASPIRANT
            </div>

          </div>

          <div className="hero-image-decoration"></div>

        </motion.div>

      </div>

      <div className="hero-scroll-indicator">
        <span></span>
        SCROLL TO EXPLORE
      </div>

    </section>
  );
}

export default Hero;
