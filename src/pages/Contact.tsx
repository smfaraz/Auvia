import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, ArrowRight, Smile, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="pt-48 pb-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[500px] h-[500px] bg-brand-sky top-[-10%] right-[-10%]" />

        <div className="max-w-4xl mb-32 relative z-10">
          <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Connect with Us</span>
          <h1 className="text-6xl lg:text-7xl font-kids font-bold text-brand-ink mb-10 leading-tight">
            Let's Start a <br />
            <span className="text-brand-teal italic">Conversation.</span>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            Whether you have questions about our programs, insurance, or just want to say hello, our friendly team is here to help your family.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32 relative z-10">
          {/* Contact Form */}
          <div className="card-friendly p-12 lg:p-20 bg-white/80 backdrop-blur-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-mint text-brand-teal rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-kids font-bold text-brand-ink mb-4">Message Sent!</h2>
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
                  <h2 className="text-3xl font-kids font-bold text-brand-ink mb-10">Send a Message</h2>
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-brand-teal uppercase tracking-widest font-kids">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full bg-brand-cream/30 border-b-2 ${errors.firstName ? 'border-red-400' : 'border-brand-teal/10'} px-0 py-3 text-sm focus:border-brand-teal outline-none transition-colors font-medium`}
                          placeholder="Evelyn"
                        />
                        {errors.firstName && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-brand-teal uppercase tracking-widest font-kids">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full bg-brand-cream/30 border-b-2 ${errors.lastName ? 'border-red-400' : 'border-brand-teal/10'} px-0 py-3 text-sm focus:border-brand-teal outline-none transition-colors font-medium`}
                          placeholder="Sinclair"
                        />
                        {errors.lastName && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-brand-teal uppercase tracking-widest font-kids">Email Address *</label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-brand-cream/30 border-b-2 ${errors.email ? 'border-red-400' : 'border-brand-teal/10'} px-0 py-3 text-sm focus:border-brand-teal outline-none transition-colors font-medium`}
                        placeholder="evelyn@example.com"
                      />
                      {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.email}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-brand-teal uppercase tracking-widest font-kids">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-brand-cream/30 border-b-2 ${errors.phone ? 'border-red-400' : 'border-brand-teal/10'} px-0 py-3 text-sm focus:border-brand-teal outline-none transition-colors font-medium`}
                        placeholder="(555) 000-0000"
                      />
                      {errors.phone && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.phone}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-brand-teal uppercase tracking-widest font-kids">How can we help?</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-brand-cream/30 border-b-2 border-brand-teal/10 px-0 py-3 text-sm focus:border-brand-teal outline-none transition-colors resize-none font-medium"
                        placeholder="Tell us a bit about your child..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-friendly-primary w-full py-5 flex items-center justify-center gap-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight size={20} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Info */}
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-kids font-bold text-brand-ink mb-10">Get in Touch</h2>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-mint text-brand-teal flex items-center justify-center shrink-0 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink mb-2">Call Us</h4>
                    <p className="text-brand-sage text-sm mb-3 font-medium">Monday – Friday, 8am – 6pm.</p>
                    <a href="tel:8005550123" className="text-brand-teal font-bold text-lg hover:text-brand-ink transition-colors font-kids">(800) 555-0123</a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-peach text-brand-teal flex items-center justify-center shrink-0 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink mb-2">Email Us</h4>
                    <p className="text-brand-sage text-sm mb-3 font-medium">We'll get back to you within 24 hours.</p>
                    <a href="mailto:hello@auviakids.com" className="text-brand-teal font-bold text-lg hover:text-brand-ink transition-colors font-kids">hello@auviakids.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-lavender text-brand-teal flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink mb-2">Visit Us</h4>
                    <p className="text-brand-sage text-sm mb-3 font-medium">Our main office is in Dallas.</p>
                    <p className="text-brand-ink font-bold text-sm font-kids">123 Healing Way, Suite 100, Dallas, TX 75201</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-friendly bg-brand-mint/30 border-brand-teal/10">
              <h3 className="text-2xl font-kids font-bold text-brand-ink mb-4">For Doctors</h3>
              <p className="text-brand-sage leading-relaxed mb-8 font-medium">
                We love working with other healthcare providers. If you'd like to refer a patient, please use our secure portal.
              </p>
              <a href="mailto:referrals@auviakids.com?subject=Patient%20Referral" className="text-brand-teal font-bold text-sm font-kids hover:text-brand-ink transition-colors flex items-center gap-2">
                Secure Referral Portal <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
