import React, { useRef, memo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Rocket,
  Users,
  Globe,
  BadgeCheck,
  Shield,
  Award,
  Heart,
  Star,
  ArrowRight,
  Target,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const TIMELINE = [
  {
    year: "2021",
    title: "Founded",
    description:
      "RedBirds established with a core team of defense experts in Silicon Valley, focused on democratizing enterprise-grade security for SMBs.",
    icon: Rocket,
  },
  {
    year: "2022",
    title: "First 100 Clients",
    description:
      "Secured 100+ SMB infrastructures across North America with zero breach incidents across our client portfolio.",
    icon: Users,
  },
  {
    year: "2023",
    title: "Global Expansion",
    description:
      "Launched threat intelligence node network spanning 15 countries, with SOC operations in Singapore and London.",
    icon: Globe,
  },
  {
    year: "2024",
    title: "Industry Leader",
    description:
      "Recognized in Gartner Cool Vendor report for automated VAPT and cloud security posture management.",
    icon: BadgeCheck,
  },
  {
    year: "2025",
    title: "Enterprise Scale",
    description:
      "Crossed 500+ security audits, expanded to serve Fortune 500 clients, and achieved CREST certification.",
    icon: Star,
  },
];

const TEAM = [
  {
    name: "Marcus Thorne",
    role: "Chief Executive Officer",
    initials: "MT",
    bio: "Former NSA threat analyst. 15 years in offensive security. Led red teams at two Fortune 50 companies.",
    linkedin: "#",
  },
  {
    name: "Sarah Chen",
    role: "Chief Security Officer",
    initials: "SC",
    bio: "Ex-Mandiant incident response lead. CISSP, OSCP, GXPN. Specialized in APT detection and containment.",
    linkedin: "#",
  },
  {
    name: "David Volkov",
    role: "Head of Research",
    initials: "DV",
    bio: "Published researcher with 20+ CVEs. Former Zero Day Initiative contributor. Focus on web application security.",
    linkedin: "#",
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Operations",
    initials: "ER",
    bio: "Scaled security operations from 5 to 120+ analysts. ISO 27001 lead implementer. Six Sigma Black Belt.",
    linkedin: "#",
  },
];

const CERTIFICATIONS = [
  { icon: Shield, label: "ISO 27001", desc: "Information Security Management" },
  { icon: Award, label: "SOC 2 Type II", desc: "Trust Services Criteria" },
  { icon: Heart, label: "HIPAA", desc: "Healthcare Data Protection" },
  { icon: Star, label: "CREST", desc: "Penetration Testing Standard" },
];

const VALUES = [
  {
    icon: Target,
    title: "Precision Over Noise",
    description:
      "We prioritize actionable intelligence over vanity metrics. Every report delivers clear, prioritized remediation paths.",
  },
  {
    icon: Shield,
    title: "Offense Informs Defense",
    description:
      "Our team includes active offensive security researchers. We think like attackers to build stronger defenses.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Impact",
    description:
      "Security investments must show ROI. We track mean time to remediate, risk reduction velocity, and compliance readiness.",
  },
  {
    icon: Users,
    title: "Democratized Security",
    description:
      "Enterprise-grade protection should not be a Fortune 500 privilege. We design for SMB budgets without cutting corners.",
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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay, ease: "easeOut" },
  }),
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

const TimelineItem = memo(function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.1}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[19px] md:left-[23px] top-12 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.08] to-transparent" />
      )}

      {/* Icon node */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0d1328] border border-white/[0.08] flex items-center justify-center z-10 relative">
          <item.icon size={16} className="text-cyan-400/80" />
        </div>
      </div>

      {/* Content */}
      <div className="pb-12">
        <span className="text-cyan-400/60 text-[11px] font-mono tracking-wider">
          {item.year}
        </span>
        <h3 className="text-white font-semibold text-[16px] mt-1 mb-2">
          {item.title}
        </h3>
        <p className="text-slate-400 text-[14px] leading-relaxed max-w-md">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
});

const TeamCard = memo(function TeamCard({ member, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.1}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group"
    >
      <div className="rounded-2xl border border-white/[0.06] bg-[#0d1328]/60 overflow-hidden hover:border-white/[0.1] transition-all duration-300">
        {/* Avatar area */}
        <div className="relative aspect-[4/3] bg-gradient-to-b from-[#111827] to-[#0d1328] flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center border border-white/[0.08] group-hover:scale-105 transition-transform duration-500">
            <span
              className="text-2xl font-bold text-slate-300"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {member.initials}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1328] via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="p-5">
          <h4 className="text-white font-semibold text-[15px]">
            {member.name}
          </h4>
          <p className="text-cyan-400/80 text-[11px] font-medium uppercase tracking-wider mt-0.5">
            {member.role}
          </p>
          <p className="text-slate-500 text-[13px] leading-relaxed mt-3">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

const ValueCard = memo(function ValueCard({ value, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      custom={index * 0.08}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="rounded-2xl border border-white/[0.06] bg-[#0d1328]/40 p-6 hover:border-white/[0.1] hover:bg-[#0d1328]/60 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-cyan-500/8 border border-cyan-500/15 flex items-center justify-center mb-4">
        <value.icon size={18} className="text-cyan-400" />
      </div>
      <h3 className="text-white font-semibold text-[15px] mb-2">
        {value.title}
      </h3>
      <p className="text-slate-400 text-[13px] leading-relaxed">
        {value.description}
      </p>
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90dvh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0A0F1E]" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px]" />

      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="relative z-10 w-full"
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-7"
            >
              <motion.div variants={fadeInUp}>
                <SectionLabel text="About RedBirds" />
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-white"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                }}
              >
                Securing the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                  Digital Frontier
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-slate-400 text-[16px] leading-[1.7] max-w-lg"
              >
                At RedBirds, we believe robust cybersecurity should not be a
                privilege of the elite. Our mission is to democratize high-grade
                digital defense for small and medium businesses — providing an
                impenetrable shield against an evolving global threat landscape.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <Link
                  to="/legal-framework"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all shadow-lg shadow-blue-500/15 active:scale-[0.98]"
                >
                  Our Strategy
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => {
                    const el = document.getElementById("certifications");
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-slate-300 border border-white/[0.08] hover:bg-white/[0.03] hover:text-white transition-all active:scale-[0.98]"
                >
                  View Credentials
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              custom={0.2}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex justify-center"
            >
              <div className="relative w-full max-w-[420px] aspect-square">
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-white/[0.06] backdrop-blur-sm flex items-center justify-center">
                  <Shield
                    size={160}
                    className="text-cyan-400/20"
                    strokeWidth={0.6}
                  />
                </div>
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-[#0d1328]/90 border border-white/[0.06] backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                      SOC Active
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-[#0d1328]/90 border border-white/[0.06] backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={11} className="text-blue-400" />
                    <span className="text-[10px] text-slate-300 font-mono">
                      Singapore · London · SF
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VALUES SECTION
   ═══════════════════════════════════════════════════════════════ */

function ValuesSection() {
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
          <motion.div variants={fadeInUp}>
            <SectionLabel text="Our Principles" />
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
            What drives{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              every decision
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TIMELINE SECTION
   ═══════════════════════════════════════════════════════════════ */

function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 lg:py-32 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div variants={fadeInUp}>
                  <SectionLabel text="Our Journey" />
                </motion.div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-white mb-4"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pioneering security{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    since day one
                  </span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-slate-400 text-[14px] leading-relaxed"
                >
                  From a Silicon Valley startup to a global security partner
                  trusted by organizations across 15 countries.
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-8">
            {TIMELINE.map((item, i) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={i}
                isLast={i === TIMELINE.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEAM SECTION
   ═══════════════════════════════════════════════════════════════ */

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 lg:py-32 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel text="Leadership" />
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
              Architects of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                digital sovereignty
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-500 text-[13px] font-medium"
            >
              120+ security experts worldwide
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATIONS SECTION
   ═══════════════════════════════════════════════════════════════ */

function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-20 border-t border-white/[0.04] bg-[#080c18]/30"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-10"
        >
          <motion.p
            variants={fadeInUp}
            className="text-slate-500 text-[11px] uppercase tracking-[0.2em] font-semibold mb-2"
          >
            Industry Certifications & Compliance
          </motion.p>
          <motion.p variants={fadeInUp} className="text-slate-600 text-[13px]">
            Independently audited and validated against global standards
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center items-center gap-10 md:gap-16"
        >
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.label}
              variants={scaleIn}
              custom={i * 0.06}
              className="flex items-center gap-3 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                <cert.icon
                  size={18}
                  className="text-slate-400 group-hover:text-white transition-colors"
                />
              </div>
              <div>
                <div className="text-white text-[14px] font-semibold tracking-tight">
                  {cert.label}
                </div>
                <div className="text-slate-600 text-[11px]">{cert.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#0c1226] to-[#0f1a2e]"
        >
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
                Join the team defending the digital frontier
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed">
                We are always looking for exceptional security researchers,
                engineers, and strategists who share our mission.
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
                <Mail size={16} />
                Get in Touch
              </Link>
              <a
                href="mailto:careers@redbirds.security"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-slate-300 border border-white/[0.08] hover:bg-white/[0.03] hover:text-white transition-all active:scale-[0.98]"
              >
                <Phone size={16} />
                Careers
              </a>
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

export default function About() {
  return (
    <main className="relative bg-[#0A0F1E]">
      <HeroSection />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
      <CertificationsSection />
      <CTASection />
    </main>
  );
}
