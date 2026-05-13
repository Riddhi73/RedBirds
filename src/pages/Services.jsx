import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Shield,
  BarChart,
  Mail,
  ClipboardCheck,
  Globe,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Zap,
  Layers,
  Lock,
  FileCheck,
  Radar,
  X,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────────── */

const SERVICES_DATA = [
  {
    id: "portfolio-security",
    icon: Shield,
    title: "Portfolio Security",
    shortDesc:
      "End-to-end protection for your complete digital ecosystem — from web applications to cloud infrastructure.",
    details: {
      overview:
        "Our Portfolio Security service provides comprehensive assessment, monitoring, and hardening of every asset in your digital portfolio. We ensure no vulnerability goes undetected across your infrastructure.",
      features: [
        "Asset Discovery & Inventory Management",
        "Cross-Portfolio Vulnerability Assessment",
        "Cloud Infrastructure Security Review",
        "Web Application Portfolio Scanning",
        "Third-Party Risk Evaluation",
        "Continuous Security Monitoring",
      ],
      methodology: [
        "Discovery & Asset Mapping",
        "Baseline Security Assessment",
        "Vulnerability Identification",
        "Risk-Based Prioritization",
        "Control Implementation",
        "Ongoing Monitoring",
      ],
      deliverables: [
        "Security Assessment Report",
        "Risk Register & Heat Map",
        "Remediation Action Plan",
        "Policy Recommendations",
        "Quarterly Reviews",
      ],
    },
  },
  {
    id: "risk-assessment",
    icon: BarChart,
    title: "Risk Assessment",
    shortDesc:
      "Quantify organizational exposure through advanced modeling and data-driven security strategy.",
    details: {
      overview:
        "We identify, analyze, and evaluate risks to your information assets using frameworks aligned with ISO 27005 and NIST SP 800-30 standards.",
      features: [
        "Asset Inventory & Classification",
        "Threat Landscape Analysis",
        "Vulnerability Correlation",
        "Business Impact Assessment",
        "Risk Quantification (FAIR)",
        "Compliance Gap Analysis",
      ],
      methodology: [
        "Scope Definition",
        "Threat Assessment",
        "Control Evaluation",
        "Impact Calculation",
        "Treatment Planning",
      ],
      deliverables: [
        "Risk Register & Heat Map",
        "Treatment Plan",
        "Improvement Roadmap",
        "Executive Risk Report",
        "Monitoring Framework",
      ],
    },
  },
  {
    id: "email-security",
    icon: Mail,
    title: "Email Security",
    shortDesc:
      "Multi-layered protection against phishing, malware, and advanced email-based threats.",
    details: {
      overview:
        "Safeguard your communication infrastructure with protection that detects, prevents, and responds to email threats before they reach your users.",
      features: [
        "Advanced Threat Protection",
        "Anti-Phishing Defense",
        "Email Encryption & DLP",
        "Malware & Ransomware Filtering",
        "BEC Protection",
        "SPF, DKIM, DMARC Authentication",
      ],
      methodology: [
        "Infrastructure Assessment",
        "Threat Analysis",
        "Policy Configuration",
        "Protocol Implementation",
        "User Training",
        "Continuous Tuning",
      ],
      deliverables: [
        "Security Assessment Report",
        "Configuration Guide",
        "Incident Response Playbook",
        "Training Materials",
        "Monthly Threat Report",
      ],
    },
  },
  {
    id: "compliance-management",
    icon: ClipboardCheck,
    title: "Compliance Management",
    shortDesc:
      "Structured approach to achieving and maintaining regulatory compliance across multiple frameworks.",
    details: {
      overview:
        "Navigate complex requirements, implement controls, and demonstrate compliance to auditors and stakeholders with confidence.",
      features: [
        "Multi-Framework Mapping",
        "ISO 27001 / SOC 2 / PCI-DSS",
        "GDPR & Data Privacy",
        "Regulatory Gap Assessment",
        "Policy Development",
        "Audit Readiness",
      ],
      methodology: [
        "Requirements Analysis",
        "Gap Assessment",
        "Framework Design",
        "Implementation Roadmap",
        "Evidence Collection",
        "Continuous Monitoring",
      ],
      deliverables: [
        "Gap Assessment Report",
        "Control Framework",
        "Policy Documentation",
        "Evidence Repository",
        "Audit-Ready Package",
        "Compliance Dashboard",
      ],
    },
  },
  {
    id: "social-media-security",
    icon: Globe,
    title: "Social Media Security",
    shortDesc:
      "Protect your brand presence across all platforms from account takeover and impersonation.",
    details: {
      overview:
        "Secure accounts, monitor for threats, and respond rapidly to incidents to maintain trust and prevent reputational damage across your brand's digital presence.",
      features: [
        "Account Takeover Protection",
        "Impersonation Detection",
        "Brand Monitoring",
        "Social Engineering Defense",
        "Content Moderation",
        "Crisis Response",
      ],
      methodology: [
        "Asset Inventory",
        "Account Hardening",
        "Monitoring Setup",
        "Threat Detection",
        "Response Protocols",
        "Continuous Reporting",
      ],
      deliverables: [
        "Security Assessment",
        "Hardened Configurations",
        "Monitoring Dashboard",
        "Response Playbook",
        "Monthly Report",
        "Executive Briefing",
      ],
    },
  },
];

const SIDEBAR_LINKS = [
  {
    icon: Shield,
    label: "Portfolio Security",
    serviceId: "portfolio-security",
  },
  { icon: BarChart, label: "Risk Assessment", serviceId: "risk-assessment" },
  { icon: Mail, label: "Email Security", serviceId: "email-security" },
  {
    icon: ClipboardCheck,
    label: "Compliance",
    serviceId: "compliance-management",
  },
  { icon: Globe, label: "Social Media", serviceId: "social-media-security" },
];

const STATS = [
  { value: "5,000+", label: "Attack Vectors Monitored" },
  { value: "<15min", label: "Incident Response" },
  { value: "99.8%", label: "Threat Detection Rate" },
  { value: "24/7", label: "Security Operations" },
];

/* ────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ──────────────────────────────────────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay, ease: "easeOut" },
  }),
};

/* ────────────────────────────────────────────────────────────────
   SERVICE CARD COMPONENT
   ──────────────────────────────────────────────────────────────── */

function ServiceCard({ service, index, isExpanded, onToggle }) {
  const Icon = service.icon;

  return (
    <motion.article
      layout
      variants={fadeInUp}
      custom={index * 0.08}
      className="relative group"
    >
      <div
        className={`
          relative rounded-2xl border overflow-hidden transition-all duration-500
          ${
            isExpanded
              ? "bg-[#0f1525] border-secondary/25 shadow-[0_0_60px_rgba(6,182,212,0.06)]"
              : "bg-[#111827]/40 border-white/[0.06] hover:border-white/[0.1] hover:bg-[#111827]/60"
          }
        `}
      >
        {/* Active indicator line */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent origin-center"
            />
          )}
        </AnimatePresence>

        {/* Card Header */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <motion.div
                animate={
                  isExpanded
                    ? { scale: 1.08, backgroundColor: "rgba(6,182,212,0.12)" }
                    : { scale: 1, backgroundColor: "rgba(6,182,212,0.06)" }
                }
                transition={{ duration: 0.3 }}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-secondary/20 shrink-0"
              >
                <Icon size={20} className="text-secondary" />
              </motion.div>

              <div className="min-w-0">
                <h3 className="text-white font-semibold text-[15px] tracking-tight">
                  {service.title}
                </h3>
                <AnimatePresence mode="wait">
                  {!isExpanded && (
                    <motion.p
                      key="meta"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-500 text-[11px] font-medium uppercase tracking-wider mt-0.5"
                    >
                      {service.details.features.length} Features ·{" "}
                      {service.details.deliverables.length} Deliverables
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.button
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors shrink-0"
                  aria-label="Collapse details"
                >
                  <X size={15} />
                </motion.button>
              ) : null}
            </AnimatePresence>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mt-3.5">
            {service.shortDesc}
          </p>

          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className={`
              mt-4 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300
              ${
                isExpanded
                  ? "text-slate-500 hover:text-slate-300"
                  : "text-secondary hover:text-cyan-300"
              }
            `}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.span
                  key="collapse"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5"
                >
                  <ChevronUp size={14} />
                  Collapse
                </motion.span>
              ) : (
                <motion.span
                  key="expand"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5"
                >
                  Learn More
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.3, delay: 0.08 },
              }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-7 pt-1 border-t border-white/[0.05]">
                {/* Overview */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.1}
                >
                  <h4 className="text-secondary text-[11px] font-semibold uppercase tracking-[0.18em] mb-2.5">
                    Overview
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.details.overview}
                  </p>
                </motion.div>

                {/* Features + Methodology */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-7"
                >
                  <div>
                    <h4 className="text-secondary text-[11px] font-semibold uppercase tracking-[0.18em] mb-3.5">
                      Key Features
                    </h4>
                    <ul className="space-y-2.5">
                      {service.details.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          variants={fadeInUp}
                          custom={0.15 + i * 0.035}
                          className="flex items-start gap-3 text-sm text-slate-400"
                        >
                          <span className="w-5 h-5 rounded-md bg-secondary/8 flex items-center justify-center shrink-0 mt-0.5 border border-secondary/15">
                            <CheckCircle
                              size={10}
                              className="text-secondary/80"
                            />
                          </span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-secondary text-[11px] font-semibold uppercase tracking-[0.18em] mb-3.5">
                      Methodology
                    </h4>
                    <ul className="space-y-2.5">
                      {service.details.methodology.map((step, i) => (
                        <motion.li
                          key={i}
                          variants={fadeInUp}
                          custom={0.2 + i * 0.035}
                          className="flex items-start gap-3 text-sm text-slate-400"
                        >
                          <span className="w-5 h-5 rounded-md bg-white/[0.03] flex items-center justify-center shrink-0 mt-0.5 border border-white/[0.06]">
                            <span className="text-[9px] font-mono text-slate-500 leading-none">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </span>
                          {step}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Deliverables */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-7"
                >
                  <h4 className="text-secondary text-[11px] font-semibold uppercase tracking-[0.18em] mb-3.5">
                    Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.details.deliverables.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={scaleIn}
                        custom={0.3 + i * 0.04}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] hover:bg-white/[0.035] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shrink-0" />
                        <span className="text-sm text-slate-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.45}
                  className="mt-7 flex items-center gap-4"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all shadow-lg shadow-blue-500/10"
                  >
                    Get a Quote
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    onClick={onToggle}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronUp size={14} />
                    Collapse
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ────────────────────────────────────────────────────────────────
   SIDEBAR COMPONENT
   ──────────────────────────────────────────────────────────────── */

function HoverSidebar({ expandedIds, onNavigate }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleTriggerEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleSidebarLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 180);
  }, []);

  const handleSidebarEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <>
      {/* Trigger zone */}
      <div
        onMouseEnter={handleTriggerEnter}
        className="fixed left-0 top-0 w-5 h-full z-50"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0.8 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
            className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-[#0B1021]/95 backdrop-blur-xl border-r border-white/[0.06] pt-20 pb-6 z-40 shadow-2xl"
          >
            <div className="px-5 mb-6">
              <h2
                className="text-white font-bold text-[15px] tracking-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Core Systems
              </h2>
              <p className="text-[10px] text-secondary uppercase tracking-[0.2em] mt-1 font-medium">
                Vigilance Level: High
              </p>
            </div>

            <nav className="flex-1 flex flex-col gap-0.5 px-2">
              {SIDEBAR_LINKS.map((link) => {
                const isActive = expandedIds.has(link.serviceId);
                return (
                  <button
                    key={link.serviceId}
                    onClick={() => onNavigate(link.serviceId)}
                    className={`
                      w-full px-4 py-2.5 rounded-lg flex items-center gap-3 text-left transition-all duration-200
                      ${
                        isActive
                          ? "bg-cyan-500/8 text-cyan-400"
                          : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]"
                      }
                    `}
                  >
                    <link.icon
                      size={17}
                      className={isActive ? "text-cyan-400" : "text-slate-600"}
                    />
                    <span className="text-[13px] font-medium">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-indicator"
                        className="ml-auto w-1 h-1 rounded-full bg-cyan-400"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="px-4 mt-auto">
              <Link
                to="/contact"
                className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600/90 to-cyan-500/90 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/8"
              >
                <Zap size={14} />
                Initialize Scan
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ──────────────────────────────────────────────────────────────── */

export default function Services() {
  const [expandedIds, setExpandedIds] = useState(new Set());

  const isExpanded = useCallback((id) => expandedIds.has(id), [expandedIds]);

  const toggleCard = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSidebarNavigate = useCallback((serviceId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.add(serviceId);
      return next;
    });
    const el = document.getElementById(`service-${serviceId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0A0F1E]">
      <HoverSidebar
        expandedIds={expandedIds}
        onNavigate={handleSidebarNavigate}
      />

      <div className="pt-24 px-6 sm:px-8 lg:px-12 pb-20">
        <div className="max-w-[1200px] mx-auto">
          {/* ── Hero ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/15 text-cyan-400 text-[11px] uppercase tracking-[0.18em] font-medium mb-5">
              <Radar size={12} className="text-cyan-400" />
              Active Defense Services
            </div>

            <h1
              className="text-white max-w-2xl mb-5"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Securing the next generation of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                digital sovereignty
              </span>
            </h1>

            <p className="text-slate-400 max-w-xl text-[15px] leading-relaxed">
              Enterprise-grade infrastructure auditing and threat intelligence
              designed for high-stakes environments.
            </p>
          </motion.section>

          {/* ── Stats Strip ── */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.05] mb-16"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                custom={i * 0.05}
                className="bg-[#0d1324] p-6 flex flex-col gap-1.5"
              >
                <span
                  className="text-[2rem] font-bold text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[11px] text-slate-500 font-mono tracking-wider uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.section>

          {/* ── Services Grid ── */}
          <motion.section className="mb-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {SERVICES_DATA.map((service, i) => (
                <div key={service.id} id={`service-${service.id}`}>
                  <ServiceCard
                    service={service}
                    index={i}
                    isExpanded={isExpanded(service.id)}
                    onToggle={() => toggleCard(service.id)}
                  />
                </div>
              ))}
            </motion.div>
          </motion.section>
          {/* ── Bottom CTA ── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#0d1328] to-[#111b2e]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

            <div className="relative px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-lg">
                <h2
                  className="text-white text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Ready to secure your infrastructure?
                </h2>
                <p className="text-slate-400 text-[15px] leading-relaxed">
                  Schedule a free consultation with our security architects and
                  receive a tailored assessment roadmap within 48 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all shadow-xl shadow-blue-500/15"
                >
                  <Lock size={15} />
                  Free Security Audit
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-300 border border-white/[0.08] hover:bg-white/[0.03] hover:text-white transition-all"
                >
                  Our Credentials
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
