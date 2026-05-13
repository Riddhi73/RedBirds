import React, { useState, useRef, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  MessageSquare,
  Building2,
  User,
  FileText,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "operations@redbirds.security",
    href: "mailto:operations@redbirds.security",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+65 9123 4567",
    href: "tel:+6591234567",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Singapore · London · San Francisco",
    href: null,
  },
];

const SERVICES = [
  { value: "", label: "Select a service..." },
  { value: "portfolio-security", label: "Portfolio Security" },
  { value: "risk-assessment", label: "Risk Assessment" },
  { value: "email-security", label: "Email Security" },
  { value: "compliance-management", label: "Compliance Management" },
  { value: "social-media-security", label: "Social Media Security" },
  { value: "other", label: "Other / General Inquiry" },
];

const RESPONSE_TIME =
  "We respond to all inquiries within 24 hours. For urgent security incidents, our SOC is available 24/7.";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

const SectionLabel = memo(function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-[1px] bg-cyan-500/40" />
      <span className="text-cyan-400 text-[11px] uppercase tracking-[0.2em] font-semibold">
        {text}
      </span>
    </div>
  );
});

const ContactCard = memo(function ContactCard({ info, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const Icon = info.icon;

  const content = (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.1}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`
        flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-[#0d1328]/40
        ${info.href ? "hover:border-white/[0.1] hover:bg-[#0d1328]/60 cursor-pointer transition-all duration-300 group" : ""}
      `}
    >
      <div className="w-10 h-10 rounded-xl bg-cyan-500/8 border border-cyan-500/15 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/12 transition-colors">
        <Icon size={18} className="text-cyan-400" />
      </div>
      <div>
        <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider mb-1">
          {info.label}
        </p>
        <p className="text-white text-[14px] font-medium">{info.value}</p>
      </div>
      {info.href && (
        <ArrowRight
          size={14}
          className="text-slate-600 ml-auto shrink-0 mt-1 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all"
        />
      )}
    </motion.div>
  );

  if (info.href) {
    return (
      <a href={info.href} className="block">
        {content}
      </a>
    );
  }

  return content;
});

/* ═══════════════════════════════════════════════════════════════
   FORM COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 20)
      newErrors.message = "Message must be at least 20 characters";
    return newErrors;
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user types
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
    },
    [validate],
  );

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={28} className="text-emerald-400" />
        </div>
        <h3
          className="text-white text-xl font-bold mb-3"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Message Received
        </h3>
        <p className="text-slate-400 text-[14px] leading-relaxed max-w-sm mx-auto mb-8">
          Thank you for reaching out. Our security team will review your inquiry
          and respond within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              company: "",
              email: "",
              service: "",
              message: "",
            });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all"
        >
          Send Another Message
          <ArrowRight size={14} />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-slate-400 text-[12px] font-medium uppercase tracking-wider mb-2"
          >
            Full Name *
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
            />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl bg-[#0d1328]/60 border text-white text-[14px] placeholder:text-slate-600
                focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all
                ${errors.name ? "border-red-500/30" : "border-white/[0.06] hover:border-white/[0.1]"}
              `}
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
              <AlertCircle size={11} /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-slate-400 text-[12px] font-medium uppercase tracking-wider mb-2"
          >
            Company
          </label>
          <div className="relative">
            <Building2
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
            />
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Inc."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0d1328]/60 border border-white/[0.06] text-white text-[14px] placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all hover:border-white/[0.1]"
            />
          </div>
        </div>
      </div>

      {/* Email + Service row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="email"
            className="block text-slate-400 text-[12px] font-medium uppercase tracking-wider mb-2"
          >
            Email Address *
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl bg-[#0d1328]/60 border text-white text-[14px] placeholder:text-slate-600
                focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all
                ${errors.email ? "border-red-500/30" : "border-white/[0.06] hover:border-white/[0.1]"}
              `}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
              <AlertCircle size={11} /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-slate-400 text-[12px] font-medium uppercase tracking-wider mb-2"
          >
            Service Interest *
          </label>
          <div className="relative">
            <FileText
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
            />
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl bg-[#0d1328]/60 border text-white text-[14px]
                focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all appearance-none
                ${errors.service ? "border-red-500/30" : "border-white/[0.06] hover:border-white/[0.1]"}
              `}
            >
              {SERVICES.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#0d1328]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          {errors.service && (
            <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
              <AlertCircle size={11} /> {errors.service}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-slate-400 text-[12px] font-medium uppercase tracking-wider mb-2"
        >
          Message *
        </label>
        <div className="relative">
          <MessageSquare
            size={16}
            className="absolute left-4 top-4 text-slate-600"
          />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your security needs, infrastructure, or concerns..."
            rows={5}
            className={`
              w-full pl-11 pr-4 py-3 rounded-xl bg-[#0d1328]/60 border text-white text-[14px] placeholder:text-slate-600
              focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all resize-none
              ${errors.message ? "border-red-500/30" : "border-white/[0.06] hover:border-white/[0.1]"}
            `}
          />
        </div>
        {errors.message && (
          <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
            <AlertCircle size={11} /> {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-[15px] text-white
            bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all shadow-lg shadow-blue-500/15
            disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </button>
      </div>

      {/* Response time note */}
      <div className="flex items-start gap-3 pt-4 border-t border-white/[0.05]">
        <Clock size={14} className="text-slate-600 mt-0.5 shrink-0" />
        <p className="text-slate-500 text-[12px] leading-relaxed">
          {RESPONSE_TIME}
        </p>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function Contact() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, amount: 0.2 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 });

  return (
    <main className="relative min-h-screen bg-[#0A0F1E]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-28 pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Info */}
            <motion.div
              ref={leftRef}
              variants={staggerContainer}
              initial="hidden"
              animate={leftInView ? "visible" : "hidden"}
              className="lg:col-span-5 space-y-10"
            >
              <div className="space-y-6">
                <motion.div variants={fadeInUp}>
                  <SectionLabel text="Get in Touch" />
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-white"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Secure your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    infrastructure today
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-slate-400 text-[15px] leading-relaxed"
                >
                  Whether you need a comprehensive security audit, compliance
                  assessment, or incident response — our team is ready to help.
                </motion.p>
              </div>

              {/* Contact cards */}
              <div className="space-y-3">
                {CONTACT_INFO.map((info, i) => (
                  <ContactCard key={info.label} info={info} index={i} />
                ))}
              </div>

              {/* Trust badge */}
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/[0.06] bg-[#0d1328]/40"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/8 border border-emerald-500/15 flex items-center justify-center shrink-0">
                  <Shield size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-[13px] font-medium">
                    Enterprise-Grade Security
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    All communications are encrypted end-to-end
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              ref={rightRef}
              variants={fadeInUp}
              custom={0.2}
              initial="hidden"
              animate={rightInView ? "visible" : "hidden"}
              className="lg:col-span-7"
            >
              <div className="rounded-2xl border border-white/[0.06] bg-[#0d1328]/40 p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/8 border border-cyan-500/15 flex items-center justify-center">
                    <Lock size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-[16px]">
                      Secure Contact Form
                    </h2>
                    <p className="text-slate-500 text-[11px]">
                      All fields marked * are required
                    </p>
                  </div>
                </div>

                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
