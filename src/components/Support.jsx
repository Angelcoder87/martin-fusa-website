
import { motion } from 'framer-motion';
import {
  Heart,
  Handshake,
  Share2
} from 'lucide-react';

import './Support.css';

function Support() {
  return (
    <>
      {/* SUPPORT SECTION */}

      <section className="support-section" id="support">

        <div className="support-glow"></div>

        <div className="support-container">

          <motion.div
            className="support-banner glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="support-content">

              <span className="support-eyebrow">
                BE PART OF THE CHANGE
              </span>

              <h2>Stand with Martin</h2>

                <p>
  Support the vision for a better Umoja II.
  Contribute through M-Pesa, volunteer your time,
  or help spread the word across your estate.
              </p>

              <div className="support-options">
                <span>
                  <Heart size={15} />
                  Make a difference
                </span>

                <span>
                  <Handshake size={15} />
                  Volunteer
                </span>

                <span>
                  <Share2 size={15} />
                  Spread the word
                </span>
              </div>

            </div>
            <div className="support-mpesa">

  <span className="mpesa-label">
    <Heart size={15} />
    SUPPORT THE CAMPAIGN THROUGH M-PESA
  </span>

  <strong>0715 964 302</strong>

  <p>
    Send your contribution using M-Pesa Send Money.
  </p>

</div>

          </motion.div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="site-footer" id="contact">

        <div className="footer-container">

          <div className="footer-main">

            {/* CAMPAIGN IDENTITY */}

            <div className="footer-brand">

              <a href="#home" className="footer-logo">
                <span className="footer-logo-icon">MF</span>

                <span className="footer-logo-text">
                  <strong>Martin Fusa</strong>
                  <small>MCA, UMOJA II WARD</small>
                </span>
              </a>

              <p>
                Nationalists Patriotic Party
              </p>

              <p className="footer-description">
                Together for a Better Umoja II.
                A campaign built around listening,
                service and community development.
              </p>

            </div>

            {/* NAVIGATION */}

            <div className="footer-links">

              <h3>QUICK LINKS</h3>

              <a href="#home">Home</a>
              <a href="#about">About Martin</a>
              <a href="#manifesto">Manifesto</a>
              <a href="#your-voice">Your Voice</a>
              <a href="#support">Support the Campaign</a>

            </div>

          {/* CONTACT */}

<div className="footer-contact">

  <h3>CONTACT MARTIN</h3>

  <p>
    M-Pesa Contributions:
    <a href="tel:+254715964302">
      0715 964 302
    </a>
  </p>

  <p>
    Phone / WhatsApp:
    <a href="https://wa.me/254715964302" target="_blank" rel="noopener noreferrer">
      0715 964 302
    </a>
  </p>

  <p>
    Email:
    <a href="mailto:oyugamartin@gmail.com">
      oyugamartin@gmail.com
    </a>
  </p>

  <h3 className="footer-social-heading">
    FOLLOW THE CAMPAIGN
  </h3>

  <div className="footer-socials">
    <a href="#contact" aria-label="Facebook">FB</a>
    <a href="#contact" aria-label="Instagram">IG</a>
    <a href="#contact" aria-label="X">X</a>
  </div>

</div>
</div>

          {/* COPYRIGHT */}

          <div className="footer-bottom">

            <p>
              © {new Date().getFullYear()} Martin Fusa Campaign.
              All rights reserved.
            </p>

            <a href="#home">
              Back to top ↑
            </a>

          </div>

        </div>

      </footer>
    </>
  );
}

export default Support;
