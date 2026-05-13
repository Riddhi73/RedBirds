import React, { useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  Shield, AlertTriangle, Globe, Lock, FileText, CheckCircle,
  ChevronRight, CreditCard, HeartPulse, BookOpen, Scale,
  FileSignature, XCircle, ArrowRight, ExternalLink
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const BANGLADESH_LAWS = [
  {
    icon: Shield,
    risk: 'Critical',
    riskColor: 'red',
    name: 'Bangladesh Bank Cybersecurity Framework v1.0 (2026)',
    subtitle: 'CSF 2026 — Mandatory for financial sector',
    body: 'The most significant development of 2026. Bangladesh Bank issued a comprehensive cybersecurity policy for all scheduled banks, finance companies, MFS providers, and payment operators. Implementation deadline: December 31, 2026. Brings together ISO 27001 and NIST Cybersecurity Framework with existing ICT Security Guidelines.',
    tags: ['Risk/Vuln', 'Portfolio Sec', 'Email Sec', 'Compliance Mgmt']
  },
  {
    icon: FileText,
    risk: 'Critical',
    riskColor: 'red',
    name: 'Cyber Security Ordinance 2025',
    subtitle: 'NCSC established August 26, 2025',
    body: 'Promulgated on May 21, 2025, repealing the Cyber Security Act 2023. The National Cyber Security Council (NCSC) oversees formulation and implementation of cybersecurity policies, strategies, and plans to protect critical information infrastructure and national security.',
    tags: ['All Services', 'Compliance Mgmt']
  },
  {
    icon: FileText,
    risk: 'Moderate',
    riskColor: 'amber',
    name: 'ICT Act 2006 (Amended 2013)',
    subtitle: 'Partially superseded by DSA',
    body: 'Sections 54–66 cover hacking, data destruction, and unauthorized system access. Still operative alongside the DSA for civil and commercial disputes.',
    tags: ['Risk/Vuln', 'All Services']
  },
  {
    icon: Lock,
    risk: 'Critical',
    riskColor: 'red',
    name: 'Bangladesh Bank ICT Security Guidelines',
    subtitle: 'Mandatory for banking sector clients',
    body: 'Bangladesh Bank mandates strict ICT security standards for all scheduled banks and NBFIs. Vendor agreements with banks must be pre-approved by their IT governance committees.',
    tags: ['Compliance Mgmt', 'Risk/Vuln']
  },
  {
    icon: AlertTriangle,
    risk: 'Moderate',
    riskColor: 'amber',
    name: 'BTRC Licensing Requirements',
    subtitle: 'Bangladesh Telecommunication Regulatory Commission',
    body: 'If your email security services involve intercepting or routing telecommunications traffic, BTRC licensing may be required.',
    tags: ['Email Sec', 'Portfolio Sec']
  },
  {
    icon: FileText,
    risk: 'Foundational',
    riskColor: 'emerald',
    name: 'Companies Act 1994 & Business Registration',
    subtitle: 'RJSC + Trade License + TIN + VAT',
    body: 'Your entity must be registered with RJSC. Obtain trade license, TIN, and VAT registration if turnover exceeds the threshold.',
    tags: ['All Services']
  }
]

const INTERNATIONAL_LAWS = [
  {
    icon: Shield,
    risk: 'Critical',
    riskColor: 'red',
    name: 'GDPR — General Data Protection Regulation',
    subtitle: 'EU/EEA — Extraterritorial reach',
    body: 'GDPR applies if you process personal data of EU citizens — regardless of where your company is based. Fines reach €20M or 4% of global turnover. Key obligations: lawful basis for processing, data minimization, right to erasure, breach notification within 72 hours, and Data Processing Agreements (DPAs) with all EU clients. Appoint an EU representative if required. Standard Contractual Clauses (SCCs) govern data transfers from EU to Bangladesh.',
    tags: ['All Services']
  },
  {
    icon: Shield,
    risk: 'Critical',
    riskColor: 'red',
    name: 'ISO 27001 & SOC 2 — Framework Obligations',
    subtitle: 'Not laws, but contractually required by enterprise clients',
    body: 'Many enterprise clients — particularly in finance, healthcare, and SaaS — will require ISO 27001 certification or SOC 2 Type II audit reports before engaging. These are not laws but carry contractual force. Having these certifications signals credibility and unlocks regulated market access. Budget 6–18 months to achieve ISO 27001 certification depending on your current maturity.',
    tags: ['Compliance Mgmt', 'All Services']
  },
  {
    icon: HeartPulse,
    risk: 'Critical',
    riskColor: 'red',
    name: 'HIPAA — Health Insurance Portability & Accountability Act',
    subtitle: 'USA — Healthcare data',
    body: 'If any US healthcare organization is your client and you handle PHI, HIPAA applies to you as a Business Associate. Penalties reach $1.9M per violation category.',
    tags: ['Risk/Vuln', 'Compliance Mgmt']
  },
  {
    icon: CreditCard,
    risk: 'Critical',
    riskColor: 'red',
    name: 'PCI-DSS v4.0 — Payment Card Industry Standard',
    subtitle: 'Global — Payment data environments',
    body: 'If you conduct vulnerability assessments for clients handling card payment data, PCI-DSS v4.0 applies. Version 4.0 became mandatory in March 2024.',
    tags: ['Risk/Vuln', 'Compliance Mgmt']
  },
  {
    icon: Globe,
    risk: 'Critical',
    riskColor: 'red',
    name: 'CFAA — Computer Fraud & Abuse Act',
    subtitle: 'USA — Applies to US-based systems you test remotely',
    body: 'The CFAA makes unauthorized access to computer systems a federal crime. Even from Bangladesh, probing US-hosted systems without explicit written authorization creates CFAA exposure.',
    tags: ['Risk/Vuln', 'Portfolio Sec']
  },
  {
    icon: Shield,
    risk: 'Critical',
    riskColor: 'red',
    name: 'Computer Misuse Act 1990',
    subtitle: 'UK — Extraterritorial criminal reach',
    body: "UK's primary computer crime law. Unauthorized access to any UK-based computer system — even remotely from Bangladesh — is a criminal offence.",
    tags: ['Risk/Vuln', 'Portfolio Sec']
  }
]

const CONTRACTS = [
  {
    num: '01',
    type: 'Must-have',
    title: 'Scope of Work Agreement',
    abbr: 'SoW',
    body: 'Defines the specific deliverables, timelines, milestones, and acceptance criteria for each engagement. Prevents scope creep and establishes clear expectations.',
    items: [
      'Detailed project scope and deliverables',
      'Timeline with key milestones and deadlines',
      'Roles and responsibilities of each party',
      'Change request and approval process',
      'Explicit written authorization to proceed'
    ]
  },
  {
    num: '02',
    type: 'Must-have',
    title: 'Master Service Agreement',
    abbr: 'MSA',
    body: 'The foundational contract governing the overall commercial relationship. Covers terms that apply across all engagements between the parties.',
    items: [
      'Liability limitations and indemnification terms',
      'Intellectual property ownership and licensing',
      'Termination rights, notice periods, and exit procedures',
      'Governing law and jurisdiction for disputes',
      'Dispute resolution mechanism — arbitration or litigation'
    ]
  },
  {
    num: '03',
    type: 'Must-have',
    title: 'Non-Disclosure Agreement',
    abbr: 'Mutual NDA',
    body: 'Protects sensitive commercial, technical, and strategic information exchanged during discussions, negotiations, and engagement execution.',
    items: [
      'Clear definition of confidential information',
      'Exclusions for publicly available or independently developed information',
      'Duration: typically 3–5 years post-termination',
      'Permitted disclosures for legal or regulatory requirements',
      'Data return and destruction obligations upon termination'
    ]
  },
  {
    num: '04',
    type: 'Mandatory (EU/UK clients)',
    title: 'Data Processing Agreement',
    abbr: 'DPA — GDPR Article 28',
    body: 'Required under GDPR when a service provider processes personal data on behalf of an EU or UK client. Establishes compliance obligations and audit rights.',
    items: [
      'Clear designation of data controller vs. processor roles',
      'Specification of data categories, purposes, and retention periods',
      'Approved sub-processor list with prior notification requirements',
      'Technical and organizational security measures (TOMs)',
      'Breach notification within 72 hours of discovery'
    ]
  },
  {
    num: '05',
    type: 'Strongly advised',
    title: 'Professional Indemnity & Liability Insurance',
    abbr: 'PI / E&O Insurance',
    body: 'Enterprise clients increasingly require proof of insurance as a contractual precondition. Provides financial protection against claims arising from professional errors or service failures.',
    items: [
      'Professional indemnity coverage for advisory and service errors',
      'General liability coverage for third-party bodily injury or property damage',
      'Cyber liability coverage for data breach and privacy claims',
      'Regulatory defense and fine coverage where insurable',
      'Certificate of Insurance (COI) available for client review'
    ]
  }
]

const STATS = [
  { value: '6', label: 'Bangladesh laws applicable' },
  { value: '7', label: 'International regulations' },
  { value: '5', label: 'Essential contracts' },
  { value: '3', label: 'Immediate priorities' }
]

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay, ease: 'easeOut' }
  })
}

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
  )
})

const RiskBadge = memo(function RiskBadge({ level, color }) {
  const colorMap = {
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${colorMap[color] || colorMap.red}`}>
      {level}
    </span>
  )
})

const LawCard = memo(function LawCard({ law, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const Icon = law.icon

  const cardBorder = {
    red: 'hover:border-red-500/20',
    amber: 'hover:border-amber-500/20',
    emerald: 'hover:border-emerald-500/20'
  }

  const topLine = {
    red: 'from-red-500/50 to-transparent',
    amber: 'from-amber-500/50 to-transparent',
    emerald: 'from-emerald-500/50 to-transparent'
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.08}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group relative"
    >
      <div className={`
        relative rounded-2xl border border-white/[0.06] bg-[#0d1328]/60 p-6
        hover:bg-[#0d1328]/80 transition-all duration-300
        ${cardBorder[law.riskColor]}
      `}>
        {/* Hover accent line */}
        <div className={`
          absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r ${topLine[law.riskColor]}
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        `} />

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <Icon size={18} className="text-slate-300" />
          </div>
          <RiskBadge level={law.risk} color={law.riskColor} />
        </div>

        <h3 className="text-white font-semibold text-[15px] leading-snug mb-1">
          {law.name}
        </h3>
        <p className="text-[11px] text-slate-500 font-mono tracking-wider mb-3">
          {law.subtitle}
        </p>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
          {law.body}
        </p>

        <div className="flex flex-wrap gap-2">
          {law.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] border border-white/[0.08] text-slate-500 bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

const ContractCard = memo(function ContractCard({ contract, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.08}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group"
    >
      <div className="h-full rounded-2xl border border-white/[0.06] bg-[#0d1328]/60 p-6 hover:border-white/[0.1] hover:bg-[#0d1328]/80 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] text-slate-600 font-mono tracking-wider">
            {contract.num}
          </span>
          <span className={`
            px-2.5 py-1 rounded-full text-[10px] font-medium border
            ${contract.type.includes('Must-have')
              ? 'bg-cyan-500/8 text-cyan-400/80 border-cyan-500/15'
              : contract.type.includes('Mandatory')
                ? 'bg-amber-500/8 text-amber-400/80 border-amber-500/15'
                : 'bg-emerald-500/8 text-emerald-400/80 border-emerald-500/15'
            }
          `}>
            {contract.type}
          </span>
        </div>

        <h3 className="text-white font-semibold text-[15px] mb-1">
          {contract.title}
        </h3>
        <p className="text-[11px] text-cyan-400/60 font-mono tracking-wider mb-4">
          {contract.abbr}
        </p>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-5">
          {contract.body}
        </p>

        <ul className="space-y-2.5">
          {contract.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[12px] text-slate-500"
            >
              <span className="text-cyan-500/40 shrink-0 mt-0.5">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
})

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85dvh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0A0F1E]" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />

      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="relative z-10 w-full"
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <SectionLabel text="Legal Compliance Framework" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-white mb-6"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.025em'
              }}
            >
              Cybersecurity{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Legal Framework
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-[16px] leading-[1.7] max-w-xl mb-8"
            >
              A comprehensive guide to legal, regulatory, and compliance requirements
              for cybersecurity service providers operating in Bangladesh and internationally.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {['Portfolio Security', 'Email Security', 'Risk & Vulnerability', 'Compliance Management'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium border border-white/[0.08] text-slate-400 bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   STATS STRIP
   ═══════════════════════════════════════════════════════════════ */

function StatsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section ref={ref} className="border-y border-white/[0.05] bg-[#080c18]/50">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.04]"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              custom={i * 0.05}
              className="py-8 px-6 flex flex-col gap-1.5"
            >
              <span
                className="text-[2rem] font-bold text-white"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {stat.value}
              </span>
              <span className="text-[11px] text-slate-500 font-mono tracking-wider uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   BANGLADESH LAWS SECTION
   ═══════════════════════════════════════════════════════════════ */

function BangladeshLawsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel text="Domestic Regulations" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-white"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}
          >
            Bangladesh{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Legal Landscape
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-400 text-[15px] max-w-lg mt-3"
          >
            Domestic laws and regulations governing cybersecurity services within Bangladesh.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BANGLADESH_LAWS.map((law, i) => (
            <LawCard key={law.name} law={law} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   INTERNATIONAL LAWS SECTION
   ═══════════════════════════════════════════════════════════════ */

function InternationalLawsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-24 lg:py-32 border-t border-white/[0.04] bg-[#080c18]/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel text="Cross-Border Compliance" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-white"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}
          >
            International{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Regulations
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-400 text-[15px] max-w-lg mt-3"
          >
            Cross-border legal exposure — these laws apply to you from Bangladesh.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTERNATIONAL_LAWS.map((law, i) => (
            <LawCard key={law.name} law={law} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CONTRACTS SECTION
   ═══════════════════════════════════════════════════════════════ */

function ContractsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-24 lg:py-32 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel text="Documentation" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-white"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}
          >
            Contracts &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Documentation
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-400 text-[15px] max-w-lg mt-3"
          >
            Essential legal documentation for any B2B service engagement — regardless of industry.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTRACTS.map((contract, i) => (
            <ContractCard key={contract.num} contract={contract} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DISCLAIMER SECTION
   ═══════════════════════════════════════════════════════════════ */

function DisclaimerSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section ref={ref} className="py-16 border-t border-white/[0.04] bg-[#080c18]/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="rounded-2xl border border-amber-500/10 bg-gradient-to-r from-amber-500/[0.03] to-transparent p-8 flex gap-5 items-start"
        >
          <AlertTriangle size={22} className="text-amber-400/70 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-amber-400/80 font-semibold text-[14px] mb-2">
              Legal Disclaimer
            </h4>
            <p className="text-slate-400 text-[13px] leading-relaxed">
              This framework is provided for general informational and educational purposes only.
              It does not constitute legal advice and should not be relied upon as such.
              Cybersecurity law is highly jurisdiction-specific and rapidly evolving.
              Engage qualified legal counsel in Bangladesh and in each jurisdiction where
              you operate before commencing operations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[13px] font-bold text-slate-600 tracking-wider uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          RedBirds Legal Framework
        </div>
        <p className="text-[11px] text-slate-600 font-mono text-center md:text-right">
          Portfolio Security · Email Security · Risk & Vulnerability · Compliance Management
        </p>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function LegalFramework() {
  return (
    <main className="relative bg-[#0A0F1E]">
      <HeroSection />
      <StatsStrip />
      <BangladeshLawsSection />
      <InternationalLawsSection />
      <ContractsSection />
      <DisclaimerSection />
      <Footer />
    </main>
  )
}
