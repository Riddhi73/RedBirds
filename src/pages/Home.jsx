import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Zap,
  Lock,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Radar,
  Server,
  FileCheck,
  Globe,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const HERO_STATS = [
  { value: "500+", label: "Security Audits", suffix: "" },
  { value: "99.9", label: "Threat Block Rate", suffix: "%" },
  { value: "24/7", label: "SOC Operations", suffix: "" },
  { value: "<15", label: "Min Response Time", suffix: "min" },
];

const SERVICES = [
  {
    id: "portfolio-security",
    icon: Shield,
    title: "Portfolio Security",
    description:
      "Comprehensive security assessment and hardening of your entire digital asset portfolio — from web applications to cloud infrastructure.",
    features: [
      "Asset Discovery",
      "Vulnerability Assessment",
      "Cloud Review",
      "Continuous Monitoring",
    ],
  },
  {
    id: "risk-assessment",
    icon: TrendingUp,
    title: "Risk Assessment",
    description:
      "Strategic evaluation of digital infrastructure to quantify exposure and prioritize mitigation efforts.",
    features: [
      "Threat Modeling",
      "Impact Analysis",
      "Control Gaps",
      "Risk Registers",
    ],
  },
  {
    id: "compliance",
    icon: FileCheck,
    title: "Compliance",
    description:
      "End-to-end regulatory alignment ensuring your systems meet ISO 27001, SOC 2, HIPAA, and PCI-DSS standards.",
    features: ["ISO 27001", "SOC 2 Type II", "HIPAA", "PCI-DSS v4.0"],
  },
  {
    id: "email-security",
    icon: Radar,
    title: "Email Security",
    description:
      "Multi-layered protection against phishing, malware, and advanced email-based threats targeting your communication channels.",
    features: [
      "Anti-Phishing",
      "Email Encryption",
      "Malware Filtering",
      "DMARC/DKIM/SPF",
    ],
  },
  {
    id: "social-media-security",
    icon: Server,
    title: "Social Media Security",
    description:
      "Comprehensive protection for your social media presence across all platforms — preventing account takeover and impersonation.",
    features: [
      "Account Takeover Protection",
      "Impersonation Detection",
      "Brand Monitoring",
      "Crisis Response",
    ],
  },
];

const TRUST_LOGOS = [
  "ISO 27001",
  "SOC 2 Type II",
  "HIPAA",
  "CREST",
  "PCI-DSS",
  "GDPR",
];

const TESTIMONIALS = [
  {
    quote:
      "RedBirds identified a critical RCE vulnerability in our payment gateway that three previous auditors missed. Their depth of analysis is unmatched.",
    author: "Marcus Chen",
    role: "CTO, FinVault Payments",
    metric: "0 breaches since engagement",
  },
  {
    quote:
      "The compliance roadmap they delivered cut our SOC 2 certification timeline from 14 months to 7. Their process documentation is exceptional.",
    author: "Sarah Okafor",
    role: "Head of Security, HealthStream",
    metric: "7-month SOC 2 certification",
  },
  {
    quote:
      "Their 24/7 SOC caught an APT campaign in the reconnaissance phase. We had full containment before any data exfiltration occurred.",
    author: "David Volkov",
    role: "CISO, NexGen Logistics",
    metric: "APT caught at recon phase",
  },
];

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay, ease: "easeOut" },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

const AnimatedCounter = memo(function AnimatedCounter({ value, suffix = "" }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.match(/^[^0-9.]*/)?.[0] || "";
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;

      if (Number.isInteger(numeric)) {
        setDisplay(prefix + Math.floor(current).toLocaleString());
      } else {
        setDisplay(prefix + current.toFixed(1));
      }

      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
});

const ServiceCard = memo(function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.08}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative"
    >
      <Link
        to={`/services#${service.id}`}
        className="block h-full rounded-2xl border border-white/[0.06] bg-[#0f1525]/60 backdrop-blur-sm p-6 hover:border-cyan-500/20 hover:bg-[#0f1525]/80 transition-all duration-300"
      >
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-cyan-500/8 border border-cyan-500/15 flex items-center justify-center mb-5 group-hover:bg-cyan-500/12 group-hover:scale-105 transition-all duration-300">
          <Icon size={20} className="text-cyan-400" />
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-[16px] mb-2 tracking-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-[13px] leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((f) => (
            <span
              key={f}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-500 bg-white/[0.03] border border-white/[0.05]"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Hover arrow */}
        <div className="mt-5 flex items-center gap-1.5 text-cyan-400 text-[13px] font-medium opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
          Explore
          <ArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  );
});

const TestimonialCard = memo(function TestimonialCard({ testimonial, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.12}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="rounded-2xl border border-white/[0.06] bg-[#0d1222]/80 p-7 flex flex-col"
    >
      {/* Quote */}
      <p className="text-slate-300 text-[14px] leading-relaxed italic mb-6 flex-1">
        "{testimonial.quote}"
      </p>

      {/* Metric badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15 w-fit mb-5">
        <Zap size={12} className="text-emerald-400" />
        <span className="text-emerald-400 text-[11px] font-semibold">
          {testimonial.metric}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-white/[0.08]">
          <span className="text-[11px] font-bold text-slate-300">
            {testimonial.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <div className="text-white text-[13px] font-medium">
            {testimonial.author}
          </div>
          <div className="text-slate-500 text-[11px]">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0A0F1E]" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />

      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity, scale }}
        className="relative z-10 w-full"
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-7"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/15 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-[11px] text-cyan-400 uppercase tracking-[0.2em] font-semibold">
                  Next-Generation Security
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-white"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                }}
              >
                Secure Your Business{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                  Before Threats Find You
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 text-[16px] leading-[1.7] max-w-lg"
              >
                Enterprise-grade portfolio security, risk assessment, email
                security, social media security and compliance management for
                organizations that refuse to be the next headline.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all shadow-lg shadow-blue-500/15 active:scale-[0.98]"
                >
                  <Lock size={16} />
                  Free Security Audit
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-slate-300 border border-white/[0.08] hover:bg-white/[0.03] hover:text-white hover:border-white/[0.12] transition-all active:scale-[0.98]"
                >
                  Explore Services
                  <ChevronRight size={16} />
                </Link>
              </motion.div>

              {/* Trust bar */}
              <motion.div
                variants={fadeInUp}
                className="pt-10 border-t border-white/[0.06]"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label}>
                      <div
                        className="text-white text-[1.75rem] font-bold tracking-tight"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </div>
                      <div className="text-slate-500 text-[11px] font-medium mt-0.5 tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Visual */}
            <motion.div
              variants={fadeIn}
              custom={0.3}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:flex justify-center items-center"
            >
              <div className="relative w-full max-w-[480px] aspect-square">
                {/* Orbiting rings */}
                <div className="absolute inset-[-15%] border border-blue-500/[0.07] rounded-full" />
                <div className="absolute inset-[-5%] border border-cyan-500/[0.07] rounded-full" />

                {/* Central shield */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative p-10 rounded-[36px] bg-[#0d1328]/80 border border-white/[0.06] backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
                    <Shield
                      size={160}
                      className="relative text-cyan-400/70"
                      strokeWidth={0.8}
                    />

                    {/* Status badge */}
                    <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating indicators */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-[15%] left-[5%] px-3 py-1.5 rounded-lg bg-[#0d1328]/90 border border-white/[0.06] backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <Lock size={11} className="text-blue-400" />
                    <span className="text-[10px] text-slate-300 font-mono">
                      TLS 1.3
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-[20%] right-[0%] px-3 py-1.5 rounded-lg bg-[#0d1328]/90 border border-white/[0.06] backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <Radar size={11} className="text-cyan-400" />
                    <span className="text-[10px] text-slate-300 font-mono">
                      Scanning
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES GRID SECTION
   ═══════════════════════════════════════════════════════════════ */

function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-cyan-500/40" />
            <span className="text-cyan-400 text-[11px] uppercase tracking-[0.2em] font-semibold">
              What We Do
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              variants={fadeInUp}
              className="text-white max-w-lg"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Comprehensive defense for the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                modern enterprise
              </span>
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-slate-400 text-[14px] font-medium hover:text-white transition-colors group"
              >
                View all services
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRUST BAR SECTION
   ═══════════════════════════════════════════════════════════════ */

function TrustBarSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="py-16 border-y border-white/[0.05] bg-[#080c18]/50"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <motion.p
            variants={fadeInUp}
            className="text-slate-500 text-[11px] uppercase tracking-[0.2em] font-semibold shrink-0"
          >
            Trusted by security-conscious organizations worldwide
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {TRUST_LOGOS.map((logo, i) => (
              <motion.span
                key={logo}
                variants={fadeIn}
                custom={i * 0.06}
                className="text-slate-600 text-[13px] font-semibold tracking-tight hover:text-slate-400 transition-colors cursor-default"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS SECTION
   ═══════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-cyan-500/40" />
            <span className="text-cyan-400 text-[11px] uppercase tracking-[0.2em] font-semibold">
              Client Outcomes
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-white max-w-md"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Results that speak{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              for themselves
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════════════════════ */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="pb-24 lg:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#0c1226] to-[#0f1a2e]"
        >
          {/* Ambient glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div
              variants={fadeInUp}
              className="max-w-lg text-center lg:text-left"
            >
              <h2
                className="text-white text-2xl md:text-[2rem] font-bold mb-4"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  lineHeight: 1.2,
                }}
              >
                Ready to harden your infrastructure?
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed">
                Schedule a complimentary security assessment. Our architects
                deliver a prioritized vulnerability report within 48 hours — no
                commitment required.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              custom={0.15}
              className="flex flex-col sm:flex-row items-center gap-3 shrink-0"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all shadow-xl shadow-blue-500/12 active:scale-[0.98]"
              >
                <Zap size={16} />
                Start Free Audit
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-slate-300 border border-white/[0.08] hover:bg-white/[0.03] hover:text-white transition-all active:scale-[0.98]"
              >
                Our Credentials
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <main className="relative bg-[#0A0F1E]">
      <HeroSection />
      <ServicesSection />
      <TrustBarSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
