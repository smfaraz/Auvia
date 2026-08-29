import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using the Auvia Behavior Centers website (auviatherapy.com) and its associated services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.`
    },
    {
      title: "2. Services Description",
      content: `Auvia Behavior Centers provides Applied Behavior Analysis (ABA) therapy and related behavioral health services for children with autism spectrum disorder (ASD). Our services include center-based therapy, in-home therapy, assessments, and caregiver training. All clinical services are provided by licensed and credentialed professionals including Board Certified Behavior Analysts (BCBAs) and Registered Behavior Technicians (RBTs).`
    },
    {
      title: "3. Medical Disclaimer",
      content: `The information provided on this website is for general informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician, therapist, or other qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on this website.`
    },
    {
      title: "4. Appointments & Cancellations",
      content: `Scheduling appointments through our website or by phone constitutes an agreement to our scheduling policies. We require at least 24 hours advance notice for appointment cancellations or rescheduling. Repeated late cancellations or no-shows may affect your child's scheduling priority. All cancellation policies will be reviewed during the intake process.`
    },
    {
      title: "5. Insurance & Billing",
      content: `Auvia Behavior Centers works with most major insurance providers. Insurance coverage verification is complimentary and does not guarantee coverage or payment. You are responsible for understanding your insurance benefits, co-pays, deductibles, and out-of-pocket maximums. Any outstanding balances not covered by insurance are the financial responsibility of the patient/guardian.`
    },
    {
      title: "6. Privacy & HIPAA",
      content: `We are committed to protecting your health information in accordance with the Health Insurance Portability and Accountability Act (HIPAA). Your personal health information will only be used and disclosed as permitted by law and as described in our Privacy Policy. Please review our Privacy Policy for complete information on how we collect, use, and protect your information.`
    },
    {
      title: "7. Website Use & Intellectual Property",
      content: `All content on this website, including text, images, graphics, logos, and other materials, is the property of Auvia Behavior Centers and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission. You agree not to use this website for any unlawful purpose or in any way that could damage or overburden our systems.`
    },
    {
      title: "8. Electronic Communications & SMS",
      content: `By providing your phone number and consenting to receive text messages, you agree to receive SMS communications from Auvia Behavior Centers regarding appointments, follow-ups, and general communications. Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance. Message frequency may vary.`
    },
    {
      title: "9. Limitation of Liability",
      content: `To the fullest extent permitted by law, Auvia Behavior Centers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use our website or services. Our total liability to you for any claims arising from these terms shall not exceed the amount paid by you for services in the three months preceding the claim.`
    },
    {
      title: "10. Changes to Terms",
      content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our website following any changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.`
    },
    {
      title: "11. Governing Law",
      content: `These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Dallas County, Texas.`
    },
    {
      title: "12. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at admin@auviatherapy.com or call us at (945) 758-1087. Our mailing address is 3100 Premier Dr, Suite 236, Irving, TX 75063.`
    }
  ];

  return (
    <div className="pt-20 lg:pt-24 pb-20 lg:pb-32 bg-[#FCFAF7] min-h-screen overflow-x-hidden">
      <SEO
        title="Terms of Service | Auvia Behavior Centers"
        description="Read the Terms of Service for Auvia Behavior Centers. Understand your rights, our policies on services, appointments, insurance billing, and HIPAA compliance."
        keywords="auvia terms of service, aba therapy terms, auvia behavior centers policies, autism therapy terms"
        canonicalUrl="https://auviatherapy.com/terms"
      />

      {/* Background */}
      <div className="blob-bg w-[500px] h-[500px] bg-brand-mint/15 top-[-5%] right-[-10%]" />
      <div className="blob-bg w-[400px] h-[400px] bg-brand-peach/15 bottom-[10%] left-[-10%]" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6">
            <FileText size={14} />
            Legal
          </div>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-6 leading-tight">
            Terms of <span className="text-brand-teal italic">Service.</span>
          </h1>
          <p className="text-lg text-brand-sage font-medium leading-relaxed">
            Last updated: January 1, 2026. Please read these terms carefully before using our website or services.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-brand-mint/20 px-5 py-3 rounded-2xl">
            <Shield size={16} className="text-brand-teal" />
            <span className="text-sm font-bold text-brand-teal">HIPAA Compliant · Licensed Professionals · Texas Regulated</span>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="bg-white rounded-[32px] p-8 border border-brand-teal/5 shadow-sm"
            >
              <h2 className="text-xl font-kids font-bold text-brand-ink mb-4">{section.title}</h2>
              <p className="text-brand-sage font-medium leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-brand-ink rounded-[40px] p-10 text-white"
        >
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-brand-peach shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-kids font-bold mb-3">Questions About These Terms?</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                Our team is happy to clarify any of our policies. We believe in full transparency with every family we serve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:9457581087" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition-all font-bold text-sm">
                  <Phone size={16} className="text-brand-teal" /> (945) 758-1087
                </a>
                <a href="mailto:admin@auviatherapy.com" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition-all font-bold text-sm">
                  <Mail size={16} className="text-brand-teal" /> admin@auviatherapy.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-brand-teal/10 flex flex-wrap gap-4 text-sm font-bold text-brand-sage">
          <Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link>
          <span className="text-brand-teal/30">·</span>
          <Link to="/accessibility" className="hover:text-brand-teal transition-colors">Accessibility</Link>
          <span className="text-brand-teal/30">·</span>
          <Link to="/contact" className="hover:text-brand-teal transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};
