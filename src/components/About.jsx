
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  ArrowUpRight
} from 'lucide-react';

import './About.css';

function About() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Service',
      description:
        'Honest, accountable leadership that puts residents first, not only during election time.',
      number: '01',
    },
    {
      icon: TrendingUp,
      title: 'Development',
      description:
        'A focus on roads, water, security and opportunities that support local growth.',
      number: '02',
    },
    {
      icon: Users,
      title: 'Prosperity',
      description:
        'Creating an environment where young people, families and local businesses can thrive.',
      number: '03',
    },
  ];

  return (
    <section className="about-section" id="about">

      <div className="about-glow about-glow-blue"></div>
      <div className="about-glow about-glow-red"></div>

      <div className="about-container">

        {/* LEFT: PROFILE CARD */}

        <motion.div
          className="about-profile-wrapper"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >

          <div className="about-profile-card glass">

            <div className="about-profile-top">
              <div className="about-profile-logo">MF</div>

              <span className="about-profile-tag">
                CANDIDATE PROFILE
              </span>
            </div>

            <div className="about-profile-details">
              <span className="about-profile-label">
                MEET YOUR CANDIDATE
              </span>

              <h3>Martin Oyuga</h3>

              <p className="about-profile-nickname">
                POPULARLY KNOWN AS FUSA
              </p>

              <div className="about-profile-divider"></div>

              <p className="about-profile-position">
                MCA Aspirant
                <span>Umoja II Ward</span>
              </p>
            </div>

            <div className="about-profile-footer">
              <span>YOUR VOICE MATTERS</span>
              <ArrowUpRight size={18} />
            </div>

          </div>

          <div className="about-profile-decoration"></div>

        </motion.div>

        {/* RIGHT: ABOUT CONTENT */}

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >

          <span className="section-eyebrow">
            ABOUT THE CANDIDATE
          </span>

          <h2 className="about-heading">
            Meet <span>Martin</span>
          </h2>

          <div className="about-description">
            <p>
              Martin Oyuga, popularly known as Fusa, is the
              Nationalists Patriotic Party aspirant for Member
              of County Assembly, Umoja II Ward.
            </p>

            <p>
              His campaign is centred on listening to residents,
              understanding the needs of the community and
              championing practical development priorities
              for Umoja II.
            </p>
          </div>

          {/* LEADERSHIP PILLARS */}

          <div className="about-pillars">

            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <motion.div
                  className="about-pillar glass"
                  key={pillar.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                >

                  <div className="pillar-top">
                    <div className="pillar-icon">
                      <Icon size={20} />
                    </div>

                    <span className="pillar-number">
                      {pillar.number}
                    </span>
                  </div>

                  <h3>{pillar.title}</h3>

                  <p>{pillar.description}</p>

                </motion.div>
              );
            })}

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default About;
