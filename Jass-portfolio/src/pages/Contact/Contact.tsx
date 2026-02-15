import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setSubmitSuccess(false);
        }, 3000);
      } else {
        // Show validation errors from backend
        const errorMsg = data.errors
          ? data.errors.map((err: { field?: string; message: string }) => err.message || err).join(', ')
          : data.message || 'Something went wrong. Please try again.';
        alert(errorMsg);
      }
    } catch {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputVariants = {
    default: { scale: 1 },
    focused: { scale: 1.02 },
    error: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } },
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'jasswanth.24@gmail.com', href: 'mailto:jasswanth.24@gmail.com' },
    { icon: '📍', label: 'Location', value: 'Chennai, Tamilnadu', href: '#' },
    { icon: '💼', label: 'LinkedIn', value: '/in/jasswanth-s', href: 'https://www.linkedin.com/in/jasswanth-s' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/Jasswanth-24', href: 'https://github.com/Jasswanth-24' },
  ];

  return (
    <div className="contact-page page-container grid-pattern">
      {/* Animated background elements */}
      <div className="contact-bg-elements">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title gradient-text">Get In Touch</h1>
        <p className="contact-subtitle">
          Ready to start your next project? Let's create something amazing together.
        </p>
      </motion.div>

      <div className="contact-container">
        {/* Contact Info Side */}
        <motion.div
          className="contact-info-side"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="info-header">
            <motion.div
              className="info-icon-wrapper"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 136, 0.3)',
                  '0 0 40px rgba(0, 212, 255, 0.4)',
                  '0 0 20px rgba(255, 0, 255, 0.3)',
                  '0 0 20px rgba(0, 255, 136, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="info-main-icon">🎮</span>
            </motion.div>
            <h2>Let's Level Up Together</h2>
            <p>Choose your communication channel and let's start the quest!</p>
          </div>

          <div className="contact-info-items">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                className="contact-info-item hoverable"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <span className="info-item-icon">{info.icon}</span>
                <div className="info-item-content">
                  <span className="info-item-label">{info.label}</span>
                  <span className="info-item-value">{info.value}</span>
                </div>
                <span className="info-item-arrow">→</span>
              </motion.a>
            ))}
          </div>

          {/* Gaming Stats Box */}
          <motion.div
            className="gaming-stats-box glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>🏆 Achievement Stats</h3>
            <div className="stats-row">
              <div className="stat">
                <span className="stat-num">24h</span>
                <span className="stat-text">Avg Response</span>
              </div>
              <div className="stat">
                <span className="stat-num">100%</span>
                <span className="stat-text">Reply Rate</span>
              </div>
              <div className="stat">
                <span className="stat-num">5+</span>
                <span className="stat-text">Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form Side */}
        <motion.div
          className="contact-form-side"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="form-wrapper glass-card">
            <div className="form-header">
              <div className="form-status">
                <span className="status-dot" />
                <span>Ready to receive message</span>
              </div>
              <div className="form-controls">
                <span />
                <span />
                <span />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="success-icon"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    🎉
                  </motion.div>
                  <h3>Message Sent!</h3>
                  <p>Quest completed! I'll get back to you soon.</p>
                  <motion.div
                    className="success-particles"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ✨ 🌟 ⭐ 💫
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  ref={formRef}
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name Field */}
                  <motion.div
                    className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''}`}
                    variants={inputVariants}
                    animate={errors.name ? 'error' : focusedField === 'name' ? 'focused' : 'default'}
                  >
                    <label htmlFor="name">
                      <span className="field-icon">👤</span>
                      Player Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your name..."
                      className="hoverable"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}
                    variants={inputVariants}
                    animate={errors.email ? 'error' : focusedField === 'email' ? 'focused' : 'default'}
                  >
                    <label htmlFor="email">
                      <span className="field-icon">📧</span>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your.email@example.com"
                      className="hoverable"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    className={`form-group ${focusedField === 'subject' ? 'focused' : ''} ${errors.subject ? 'error' : ''}`}
                    variants={inputVariants}
                    animate={errors.subject ? 'error' : focusedField === 'subject' ? 'focused' : 'default'}
                  >
                    <label htmlFor="subject">
                      <span className="field-icon">🎯</span>
                      Mission Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="What's this about?"
                      className="hoverable"
                    />
                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    className={`form-group ${focusedField === 'message' ? 'focused' : ''} ${errors.message ? 'error' : ''}`}
                    variants={inputVariants}
                    animate={errors.message ? 'error' : focusedField === 'message' ? 'focused' : 'default'}
                  >
                    <label htmlFor="message">
                      <span className="field-icon">💬</span>
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project, idea, or just say hi..."
                      rows={5}
                      className="hoverable"
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="submit-btn hoverable"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 255, 136, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          className="loading-spinner"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          ⚡
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>🚀</span>
                        Launch Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
