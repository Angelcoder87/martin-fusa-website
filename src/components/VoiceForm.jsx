
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';

import './VoiceForm.css';

function VoiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    estate: '',
    topic: 'Roads and infrastructure',
    message: '',
    consent: false,
    website: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
const turnstileContainerRef = useRef(null);

useEffect(() => {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.error('Turnstile site key is missing.');
    return;
  }

  let widgetId;
  let cancelled = false;

  const renderWidget = () => {
    if (
      cancelled ||
      !window.turnstile ||
      !turnstileContainerRef.current
    ) {
      return;
    }

    widgetId = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: siteKey,

        callback: (token) => {
          setTurnstileToken(token);
          setStatus('');
        },

        'expired-callback': () => {
          setTurnstileToken('');
        },

        'error-callback': () => {
          setTurnstileToken('');
          setStatus('Security check failed. Please try again.');
        },
      }
    );
  };

  let script = document.querySelector(
    'script[src*="challenges.cloudflare.com/turnstile"]'
  );

  const handleLoad = () => renderWidget();

  if (window.turnstile) {
    renderWidget();
  } else if (script) {
    script.addEventListener('load', handleLoad);
  } else {
    script = document.createElement('script');
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', handleLoad);
    document.head.appendChild(script);
  }

  return () => {
    cancelled = true;
    script?.removeEventListener('load', handleLoad);

    if (widgetId !== undefined && window.turnstile) {
      window.turnstile.remove(widgetId);
    }
  };
}, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;
    if (!turnstileToken) {
  setStatus('Please complete the security check before submitting.');
  return;
}
    if (!formData.consent) {
      setStatus('Please read and accept the Privacy Notice before submitting.');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/api/submit-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
  ...formData,
  turnstileToken,
}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || 'We could not send your message. Please try again.'
        );
      }

      setStatus('Thank you! Your message has been received successfully.');

      setFormData({
        name: '',
        estate: '',
        topic: 'Roads and infrastructure',
        message: '',
        consent: false,
        website: '',
      });

    } catch (error) {
      console.error('Form submission error:', error);

      setStatus(
        error.message || 'Something went wrong. Please try again.'
      );

   } finally {
  setIsSubmitting(false);
} 
  };

  return (
    <section className="voice-section" id="your-voice">

      <div className="voice-glow voice-glow-red"></div>
      <div className="voice-glow voice-glow-blue"></div>

      <div className="voice-container">

        {/* LEFT: INTRODUCTION */}

        <motion.div
          className="voice-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <span className="section-eyebrow">
            TWO-WAY CAMPAIGN
          </span>

          <h2>
            Hear your <span>voice.</span>
          </h2>

          <p>
            What is the one thing you want fixed in your
            estate? Tell Martin directly. Every message is
            read and shapes the plan.
          </p>

          <div className="voice-note">
            <div className="voice-note-icon">
              <MessageCircle size={21} />
            </div>

            <div>
              <h3>Your voice matters</h3>
              <span>
                Share your concerns and ideas for Umoja II.
              </span>
            </div>
          </div>

        </motion.div>

        {/* RIGHT: RESIDENT FORM */}

        <motion.div
          className="voice-form-wrapper glass"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >

          <div className="voice-form-header">
            <span className="voice-form-label">
              SHARE YOUR THOUGHTS
            </span>

            <p>
              Your ideas can help shape our community's priorities.
            </p>
          </div>

          <form className="voice-form" onSubmit={handleSubmit}>
            {/* HONEYPOT: hidden from real visitors */}
<div className="voice-honeypot" aria-hidden="true">
  <label htmlFor="resident-website">
    Leave this field empty
  </label>
  <input
    type="text"
    id="resident-website"
    name="website"
    value={formData.website}
    onChange={handleChange}
    tabIndex="-1"
    autoComplete="off"
  />
</div>
            <div className="voice-field">
              <label htmlFor="resident-name">Your name</label>

              <input
                type="text"
                id="resident-name"
                name="name"
                placeholder="e.g. Wanjiku Kamau"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
              />
            </div>

            <div className="voice-field">
              <label htmlFor="resident-estate">Your estate</label>

              <input
                type="text"
                id="resident-estate"
                name="estate"
                placeholder="Where in Umoja II do you live?"
                value={formData.estate}
                onChange={handleChange}
                required
                maxLength={100}
              />
            </div>

            <div className="voice-field">
              <label htmlFor="resident-topic">Topic of concern</label>

              <select
                id="resident-topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
              >
                <option>Roads and infrastructure</option>
                <option>Water and sanitation</option>
                <option>Security</option>
                <option>Youth and sports</option>
                <option>Small businesses and enterprise</option>
                <option>Other community concerns</option>
              </select>
            </div>

            <div className="voice-field">
              <label htmlFor="resident-message">
                Tell Martin more
              </label>

              <textarea
                id="resident-message"
                name="message"
                placeholder="What needs to change, and where?"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={2000}
                rows={5}
              />
            </div>

            {/* PRIVACY CONSENT */}

            <div className="voice-consent">
              <input
                type="checkbox"
                id="privacy-consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />

              <label htmlFor="privacy-consent">
                I have read and understood the{' '}
                <a href="#privacy-notice">
                  Privacy Notice
                </a>.
              </label>
            </div>
            <div
  ref={turnstileContainerRef}
  className="turnstile-container"
/>
            <button
              type="submit"
              className="voice-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send to Martin'}
              <Send size={17} />
            </button>

            {status && (
              <p className="voice-status" role="status" aria-live="polite">
                {status}
              </p>
            )}

            <p className="voice-privacy-note">
              Please avoid sharing passwords or other sensitive
              personal information in your message.
            </p>

          </form>

          {/* PRIVACY NOTICE */}

          <details className="privacy-details" id="privacy-notice">
            <summary>Privacy Notice</summary>

            <div className="privacy-details-content">
              <h3>Who is responsible for your information?</h3>
              <p>
                Martin Oyuga, popularly known as Martin Fusa,
                is responsible for receiving and managing
                information submitted through this website.
              </p>

              <h3>What information do we collect?</h3>
              <p>
                We collect your name, estate, topic of concern
                and the message you provide.
              </p>

              <h3>How will your information be used?</h3>
              <p>
                Your information will be used to receive, review
                and respond to community concerns and enquiries.
              </p>

              <h3>How long do we keep your information?</h3>
              <p>
                Submissions will generally be retained for up to
                12 months. Information may be kept longer where
                a concern remains unresolved or where retention
                is otherwise legitimately necessary.
              </p>

              <h3>Will your information be shared?</h3>
              <p>
                Your information will not be sold. Access will
                be limited to Martin and anyone he specifically
                authorizes to help manage submissions.
              </p>

              <h3>Your privacy rights</h3>
              <p>
                You may contact Martin to ask about your personal
                information, request access or correction, or
                request deletion where applicable.
              </p>

              <h3>Privacy enquiries</h3>
              <p>
                Email:{' '}
                <a href="mailto:oyugamartin@gmail.com">
                  oyugamartin@gmail.com
                </a>
              </p>
            </div>
          </details>

        </motion.div>

      </div>

    </section>
  );
}

export default VoiceForm;
