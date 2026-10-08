import '../styles/pages.css';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Phone, Mail, MapPin, ArrowRight, Smile, CheckCircle2, Stethoscope } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { SEO } from '../components/SEO';

export const Contact = () => {
  const location = useLocation();
  const inquiry = location.state as { preferredCenter?: string; intent?: string } | null;
  const initialMessage = inquiry?.preferredCenter
    ? `${inquiry.intent === 'tour' ? 'Tour inquiry' : 'Inquiry'} for ${inquiry.preferredCenter}`
    : '';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceProvider: '',
    message: initialMessage,
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9\-() ]+$/.test(formData.phone)) {
      newErrors.phone = 'Only numbers, hyphens, and parentheses are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        status: 'new',
        source: 'contact_page',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', insuranceProvider: '', message: '', consent: false });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="inner-public-page public-page ic-page pt-20 lg:pt-24 bg-brand-cream overflow-x-hidden min-h-screen">
      <SEO 
        title="Contact Us | Start ABA Therapy"
        description="Get in touch with Auvia Behavior Centers. Fill out our interest form, call us, or find a center near you to start your child's ABA therapy journey."
        keywords="contact auvia, aba therapy consultation, autism assessment contact, start aba therapy"
        canonicalUrl="https://auviatherapy.com/contact"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[500px] h-[500px] bg-brand-sky top-[-10%] right-[-10%]" />

        <div className="ic-hero-grid">
        <div className="route-title-block max-w-4xl mb-12 lg:mb-20 relative z-10">
          <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Connect with Us</span>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-10 leading-tight">
            Let's Start a <br />
            <span className="text-brand-teal italic">Conversation.</span>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            Whether you have questions about our programs, insurance, or just want to say hello, our friendly team is here to help your family.
          </p>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="ic-hero-photo"
        >
          <img src="/images/kids-team.webp" alt="" decoding="async" />
        </motion.div>
        </div>
      </div>

      <div className="vform-band ic-contact-band">
        <span aria-hidden="true" className="ic-deco ic-deco--flower ic-con-deco-a" />
        <span aria-hidden="true" className="ic-deco ic-deco--star ic-con-deco-b" />
        <span aria-hidden="true" className="ic-deco ic-deco--squiggle ic-con-deco-c" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="vform-card relative"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="vform-success text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-mint text-brand-teal rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 strokeWidth={1.75} aria-hidden="true" size={48} />
                  </div>
                  <h2 className="text-section font-kids font-bold text-brand-ink mb-4">Message Sent!</h2>
                  <p className="text-brand-sage font-medium mb-10">
                    Thank you for reaching out. Our friendly team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-friendly-outline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-section font-kids font-bold text-brand-ink mb-6">Send a Message</h2>
                  <form aria-busy={isSubmitting} className="vform space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-firstName" className="vform-label">First Name *</label>
                        <input
                          type="text"
                          id="contact-firstName" required autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "contact-firstName-error" : undefined}
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full outline-none"
                        />
                        {errors.firstName && <p id="contact-firstName-error" role="alert" className="vform-field-error">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-lastName" className="vform-label">Last Name *</label>
                        <input
                          type="text"
                          id="contact-lastName" required autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "contact-lastName-error" : undefined}
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full outline-none"
                        />
                        {errors.lastName && <p id="contact-lastName-error" role="alert" className="vform-field-error">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="vform-label">Email Address *</label>
                      <input
                        type="email"
                        id="contact-email" required autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full outline-none"
                        placeholder="your@email.com"
                      />
                      {errors.email && <p id="contact-email-error" role="alert" className="vform-field-error">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="vform-label">Phone Number *</label>
                      <input
                        type="tel"
                        id="contact-phone" required autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full outline-none"
                        placeholder="(555) 000-0000"
                      />
                      {errors.phone && <p id="contact-phone-error" role="alert" className="vform-field-error">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-insuranceProvider" className="vform-label">Current Insurance Provider</label>
                      <select
                        id="contact-insuranceProvider"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleChange as any}
                        className="w-full outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Please Select</option>
                        <option value="BCBS TX">BCBS TX</option>
                        <option value="AETNA COMMERCIAL">Aetna Commercial</option>
                        <option value="CIGNA">Cigna</option>
                        <option value="UNITED HEALTHCARE">UnitedHealthcare</option>
                        <option value="WELLPOINT MEDICAID">Wellpoint Medicaid</option>
                        <option value="AETNA MEDICAID">Aetna Medicaid</option>
                        <option value="SUPERIOR HEALTH">Superior Health</option>
                        <option value="MOLINA">Molina Healthcare</option>
                        <option value="CARELON">Carelon</option>
                        <option value="TRICARE">TRICARE</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="vform-label">How can we help?</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full outline-none resize-none"
                        placeholder="Tell us a bit about your child..."
                      ></textarea>
                    </div>

                    <div className="vform-consent flex gap-4 items-start p-4 rounded-2xl">
                      <input
                        type="checkbox"
                        id="contact-consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1.5 accent-brand-teal h-5 w-5 shrink-0 cursor-pointer"
                      />
                      <label htmlFor="contact-consent" className="text-small text-brand-sage leading-relaxed cursor-pointer">
                        By checking the box, and submitting this form, you consent to receive text messages (SMS) regarding, but not limited to answering your questions, providing follow-up, and general communication from Auvia Behavior Centers. Consent is not a condition of receiving services. Message frequency may vary. Message and data rates may apply. You can reply STOP to opt out of further messaging, reply HELP for assistance, or call (945) 758-1087. Please see our <Link to="/privacy" className="text-brand-teal underline hover:text-brand-mint transition-colors">Privacy Policy</Link> for details.
                      </label>
                    </div>

                    {submitError && (
                      <p role="alert" className="form-error">
                        We couldn't send your message. Your answers are still here. Try again, or call (945) 758-1087.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-friendly-primary w-full flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight strokeWidth={1.75} aria-hidden="true" size={20} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <div className="ic-contact-info space-y-8">
            <div>
              <h2 className="text-section font-kids font-bold text-brand-ink mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0 }} className="ic-touch-card flex items-start gap-4 sm:gap-5">
                  <div className="ic-chip w-14 h-14 rounded-2xl bg-brand-mint text-brand-teal flex items-center justify-center shrink-0 shadow-sm">
                    <Phone strokeWidth={1.75} aria-hidden="true" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink mb-2">Call Us</h4>
                    <p className="text-brand-sage text-sm mb-3 font-medium">Monday – Friday, 8am – 6pm.</p>
                    <a href="tel:9457581087" className="text-brand-teal font-bold text-lg hover:text-brand-ink transition-colors font-kids">(945) 758-1087</a>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }} className="ic-touch-card flex items-start gap-4 sm:gap-5">
                  <div className="ic-chip w-14 h-14 rounded-2xl bg-brand-peach text-brand-teal flex items-center justify-center shrink-0 shadow-sm">
                    <Mail strokeWidth={1.75} aria-hidden="true" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink mb-2">Email Us</h4>
                    <p className="text-brand-sage text-sm mb-3 font-medium">We'll get back to you within 24 hours.</p>
                    <a href="mailto:admin@auviatherapy.com" className="text-brand-teal font-bold text-lg hover:text-brand-ink transition-colors font-kids">admin@auviatherapy.com</a>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.16 }} className="ic-touch-card flex items-start gap-4 sm:gap-5">
                  <div className="ic-chip w-14 h-14 rounded-2xl bg-brand-lavender text-brand-teal flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin strokeWidth={1.75} aria-hidden="true" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink mb-2">Visit Us</h4>
                    <p className="text-brand-sage text-sm mb-3 font-medium">Our main office is in Irving.</p>
                    <p className="text-brand-ink font-bold text-sm font-kids">3100 Premier Dr, Suite 236, Irving, TX 75063</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="ic-referral">
              <div aria-hidden="true" className="ic-referral__badge"><Stethoscope strokeWidth={1.75} size={30} /></div>
              <h3 className="text-2xl font-kids font-bold text-brand-ink mb-4">Physician & Pediatric Referrals</h3>
              <p className="text-brand-sage leading-relaxed mb-8 font-medium">
                We partner closely with pediatricians, neurologists, and clinical psychologists to ensure continuous, coordinated care for children with autism.
              </p>
              <a href="mailto:admin@auviatherapy.com?subject=Patient%20Referral" className="ic-referral__link font-bold text-sm font-kids inline-flex items-center gap-2">
                Submit a Patient Referral <ArrowRight strokeWidth={1.75} aria-hidden="true" size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </MotionConfig>
  );
};
