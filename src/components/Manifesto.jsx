
import { motion } from 'framer-motion';
import {
  Construction,
  Store,
  ShieldCheck,
  Droplets,
  Users,
  ArrowRight,
  Download
} from 'lucide-react';

import './Manifesto.css';

function Manifesto() {
  const priorities = [
    {
      icon: Construction,
      title: 'Improving local roads and infrastructure',
      description:
        'Better roads, easier transport, safer movement.',
      number: '01',
    },
    {
      icon: Store,
      title: 'Supporting small businesses and youth enterprise',
      description:
        'More opportunities, more jobs, a stronger community.',
      number: '02',
      featured: true,
    },
    {
      icon: ShieldCheck,
      title: 'Enhancing community security initiatives',
      description:
        'A safer, more secure environment for all.',
      number: '03',
    },
    {
      icon: Droplets,
      title: 'Investing in sustainable clean water projects',
      description:
        'Clean water, healthy families, a healthier ward.',
      number: '04',
    },
    {
      icon: Users,
      title: 'Promoting youth and sports development',
      description:
        'Empowering youths, a brighter future for our ward.',
      number: '05',
    },
  ];

  return (
    <section className="manifesto-section" id="manifesto">

      <div className="manifesto-glow manifesto-glow-blue"></div>
      <div className="manifesto-glow manifesto-glow-red"></div>

      <div className="manifesto-container">

        {/* SECTION HEADER */}

        <motion.div
          className="manifesto-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="manifesto-heading-group">
            <span className="section-eyebrow">
              TOGETHER FOR A BETTER UMOJA II
            </span>

            <h2>Our <span>Manifesto</span></h2>

            <p>
              A shared vision focused on practical priorities
              and a better future for Umoja II.
            </p>
          </div>

          <a
            href="/manifesto.pdf"
            className="manifesto-download"
            download
          >
            <Download size={17} />
            Download Manifesto (PDF)
          </a>
        </motion.div>

        {/* MANIFESTO GRID */}

        <div className="manifesto-grid">

          {priorities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className={`manifesto-card glass ${
                  item.featured ? 'manifesto-card-featured' : ''
                }`}
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
              >

                <div className="manifesto-card-top">
                  <div className="manifesto-icon">
                    <Icon size={21} />
                  </div>

                  <span className="manifesto-number">
                    {item.number}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="manifesto-card-line"></div>

              </motion.article>
            );
          })}

          {/* FINAL SUPPORT CARD */}

          <motion.article
            className="manifesto-card manifesto-support-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.5 }}
          >

            <div className="manifesto-card-top">
              <div className="manifesto-icon">
                <ArrowRight size={21} />
              </div>

              <span className="manifesto-number">06</span>
            </div>

            <h3>Help deliver this plan</h3>

            <p>
              Give your voice, share the vision, and support
              positive change in every estate.
            </p>

            <a href="#support" className="manifesto-support-btn">
              Support Martin
              <ArrowRight size={16} />
            </a>

          </motion.article>

        </div>

      </div>

    </section>
  );
}

export default Manifesto;
