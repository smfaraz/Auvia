import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, ChevronRight, MessageSquare, Globe, Clock, Cookie, Bell, Users } from 'lucide-react';

export const PrivacyPolicy = () => {
  const lastUpdated = "April 23, 2026";
  const companyName = "Auvia Behavior Centers";
  const contactPhone = "(945) 758-1087";
  const contactEmail = "admin@auviatherapy.com";
  const contactAddress = "3100 Premier Dr, Suite 236, Irving, TX 75063";

  return (
    <div className="pt-20 lg:pt-24 pb-20 lg:pb-28 relative overflow-x-hidden min-h-screen">
      {/* Background Ornaments */}
      <div className="blob-bg w-[500px] h-[500px] bg-brand-mint/20 top-[-10%] right-[-10%]" />
      <div className="blob-bg w-[400px] h-[400px] bg-brand-peach/20 bottom-[10%] left-[-10%]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-mint/30 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6">
            <Shield size={14} />
            Your Privacy Matters
          </div>
          <h1 className="text-section font-kids font-bold text-brand-ink mb-6">Privacy Policy</h1>
          <p className="text-brand-sage text-lg font-medium max-w-2xl mx-auto italic">
            Last Updated: {lastUpdated}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-brand-teal/5 space-y-12 text-brand-ink"
        >
          {/* 1. Introduction */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <FileText size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">Introduction</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              This Privacy Policy describes {companyName} policies and procedures on the collection, use and disclosure of your information when you use our service and tells you about your privacy rights and how the law protects you.
            </p>
            <p className="text-brand-sage font-medium leading-relaxed">
              We use your personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
            <p className="text-brand-sage font-medium leading-relaxed">
              {companyName} is committed to safeguarding the privacy of our users. We want to assure you that we do not share your personal information with third parties. This privacy policy outlines how we collect, use, and protect the information you provide to us.
            </p>
          </section>

          {/* 2. Information Collection */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Eye size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">Information Collection</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              We collect only the information necessary to provide and improve our services. This may include your name, email address and phone number. We do not sell, rent, or share this information with any third parties.
            </p>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Lock size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">How We Use Your Information</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              The information collected is used solely for communicating with you as the intended party. We do not share or sell your personal information with external parties for marketing or any other purposes. 
            </p>
            <p className="text-brand-sage font-medium leading-relaxed">
              Additionally, no mobile or text messaging consent information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
            <p className="text-brand-sage font-medium leading-relaxed">
              We may use personal data for the following purposes:
            </p>
            <ul className="space-y-3 pl-4">
              {[
                "To provide and maintain our service, including to monitor the usage of our service.",
                "To manage your Account: to manage your registration as a user of the Service.",
                "For the performance of a contract: the development, compliance and undertaking of the purchase contract for products or services.",
                "To contact You: By email, telephone calls, SMS, or other equivalent forms regarding updates or informative communications.",
                "To provide you with news, special offers and general information about other goods and services similar to those enquired about.",
                "To manage your requests: To attend and manage your requests to us."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-brand-sage font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-brand-sage font-medium leading-relaxed">
              All messages you send through the Service, whether to us or other users, are stored on our servers. {companyName} employs servers and services owned by third parties to retain these messages.
            </p>
          </section>

          {/* 4. SMS Disclosure */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <MessageSquare size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">SMS Disclosure</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              By reaching us by SMS, you agree to receive recurring messages from {companyName}. Message and data rates may apply. Message frequency depends on your interactions and preferences. You can reply STOP to opt-out of future messages or HELP for more information.
            </p>
            <p className="text-brand-sage font-medium leading-relaxed">
              No mobile or messaging consent information will be shared with third parties for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
          </section>

          {/* 5. Disclosure of Your Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Bell size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">Disclosure of Your Information</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              {companyName} does not share any client data with third parties for marketing, promotional purposes, or any other purposes. Your personal information is kept confidential and is not disclosed to any outside organizations, except as required by law or with your explicit consent.
            </p>
            <p className="text-brand-sage font-medium leading-relaxed">
              We may disclose your personal Information under the following limited circumstances:
            </p>
            <ul className="space-y-3 pl-4">
              {[
                "We have obtained your consent.",
                "We need to enforce our Terms of Service.",
                "We share information with partners or affiliates that have signed non-disclosure agreements with us only to provide you with a specific service.",
                "We may provide such information to a company controlled by or under common control with " + companyName + " for any purpose allowed by this Policy.",
                "We respond to subpoenas, court orders, or legal processes.",
                "When we believe it is necessary to investigate, prevent, or take action regarding illegal activities or suspected fraud.",
                "We transfer Personal Information if " + companyName + " or its assets are acquired by or merged with another company."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-brand-sage font-medium leading-relaxed">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2.5 shrink-0" />
                   {item}
                </li>
              ))}
            </ul>
            <p className="text-brand-sage font-medium leading-relaxed">
              We may share aggregated, non-identifiable information with others without further notice to you.
            </p>
          </section>

          {/* 6. International Data Transfers */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Globe size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">International Data Transfers</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              Your Personal Information may be transferred to and processed in locations outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Clock size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">Data Retention</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              We retain your Personal Information only as long as necessary to fulfill the purposes outlined in this Policy unless a longer retention period is required or permitted by law.
            </p>
          </section>

          {/* 8. Cookies and Tracking Technologies */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Cookie size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">Cookies and Tracking Technologies</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              Our Service may use cookies and similar tracking technologies to enhance your experience. You can control the use of cookies through your browser settings, but disabling cookies may limit your ability to use certain features.
            </p>
          </section>

          {/* 9. Your Choices */}
          <section className="space-y-4 p-8 bg-brand-mint/10 rounded-[30px] border border-brand-teal/5">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Users size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">Your Choices</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed mb-6">
              You have the right to access, correct, or delete your information. If you have any concerns or questions about your data, please contact us at:
            </p>
            <div className="space-y-3 font-bold text-brand-ink">
              <p className="flex items-center gap-3">
                <ChevronRight size={18} className="text-brand-teal" />
                {contactPhone}
              </p>
              <p className="flex items-center gap-3">
                <ChevronRight size={18} className="text-brand-teal" />
                {contactEmail}
              </p>
              <p className="flex items-center gap-3">
                <ChevronRight size={18} className="text-brand-teal" />
                {contactAddress}
              </p>
            </div>
          </section>

          {/* 10. HIPAA Notice of Privacy Practices */}
          <section className="space-y-4 p-8 bg-brand-sky/20 rounded-[30px] border border-brand-teal/10">
            <div className="flex items-center gap-3 text-brand-teal mb-2">
              <Shield size={24} />
              <h2 className="text-2xl font-kids font-bold tracking-tight">HIPAA Notice of Privacy Practices</h2>
            </div>
            <p className="text-brand-sage font-medium leading-relaxed">
              {companyName} is a covered entity under the Health Insurance Portability and Accountability Act (HIPAA). We are required by law to maintain the privacy of your Protected Health Information (PHI), to provide you with this Notice of our legal duties and privacy practices, and to follow the terms of the Notice currently in effect.
            </p>
            <p className="text-brand-sage font-medium leading-relaxed font-bold text-brand-ink">
              How We May Use and Disclose Your PHI:
            </p>
            <ul className="space-y-3 pl-4">
              {[
                "Treatment: We may use or disclose your PHI to provide, coordinate, or manage your child's healthcare and related services, including sharing information with other clinicians involved in your care.",
                "Payment: We may use and disclose PHI to obtain payment for services we provide, including submitting claims to insurance companies on your behalf.",
                "Healthcare Operations: We may use and disclose PHI for our own healthcare operations, such as quality improvement activities, staff training, and compliance reviews.",
                "As Required by Law: We will disclose PHI when required to do so by federal, state, or local law.",
                "No Other Uses Without Authorization: Any other use or disclosure of your PHI not described above requires your written authorization, which you may revoke at any time."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-brand-sage font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-brand-sage font-medium leading-relaxed font-bold text-brand-ink">
              Your Rights Regarding Your PHI:
            </p>
            <ul className="space-y-3 pl-4">
              {[
                "Right to Access: You have the right to inspect and obtain a copy of your PHI that we maintain.",
                "Right to Amend: You have the right to request that we amend PHI that you believe is incorrect or incomplete.",
                "Right to an Accounting of Disclosures: You have the right to request a list of certain disclosures we have made of your PHI.",
                "Right to Restrict: You have the right to request restrictions on how we use or disclose your PHI for treatment, payment, or healthcare operations.",
                "Right to Complain: You have the right to file a complaint with us or with the U.S. Department of Health and Human Services (HHS) Office for Civil Rights if you believe your privacy rights have been violated. Filing a complaint will not affect your care."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-brand-sage font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-brand-sage font-medium leading-relaxed">
              To exercise any of these rights, or to file a complaint, please contact our Privacy Officer at {contactEmail} or {contactPhone}.
            </p>
          </section>

          {/* 11. Policy Changes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-kids font-bold text-brand-ink tracking-tight">Policy Changes</h2>
            <p className="text-brand-sage font-medium leading-relaxed">
              We may update our privacy policy from time to time. Any changes will be communicated to you, and your continued use of our services implies your acceptance of the updated policy.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};
