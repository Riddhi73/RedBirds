import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, ChevronDown } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION DATA
   ═══════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Legal Framework', path: '/legal-framework' },
  { label: 'Contact', path: '/contact' }
]

const SERVICE_LINKS = [
  { label: 'Portfolio Security', path: '/services#portfolio-security' },
  { label: 'Risk Assessment', path: '/services#risk-assessment' },
  { label: 'Email Security', path: '/services#email-security' },
  { label: 'Compliance', path: '/services#compliance-management' },
  { label: 'Social Media Security', path: '/services#social-media-security' }
]

/* ═══════════════════════════════════════════════════════════════
   NAVBAR COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const servicesRef = useRef(null)
  const closeTimeoutRef = useRef(null)

  // Track scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  const handleServicesEnter = useCallback(() => {
    clearTimeout(closeTimeoutRef.current)
    setServicesOpen(true)
  }, [])

  const handleServicesLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150)
  }, [])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-[#0A0F1E]/90 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <span
                className="text-white font-bold text-[15px] tracking-tight group-hover:text-cyan-300 transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                RedBirds
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path)

                if (link.label === 'Services') {
                  return (
                    <div
                      key={link.path}
                      ref={servicesRef}
                      className="relative"
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                    >
                      <button
                        className={`
                          flex items-center gap-1 px-4 py-2 rounded-lg text-[13px] font-medium transition-all
                          ${active
                            ? 'text-cyan-400 bg-cyan-500/8'
                            : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                          }
                        `}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Services Dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-white/[0.08] bg-[#0d1328]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                          >
                            <div className="p-2">
                              {SERVICE_LINKS.map((service) => (
                                <Link
                                  key={service.path}
                                  to={service.path}
                                  className="block px-3 py-2 rounded-lg text-[13px] text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                                >
                                  {service.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      px-4 py-2 rounded-lg text-[13px] font-medium transition-all
                      ${active
                        ? 'text-cyan-400 bg-cyan-500/8'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* CTA */}
              <Link
                to="/contact"
                className="ml-3 px-5 py-2 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition-all shadow-lg shadow-blue-500/10"
              >
                Get Audit
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.03] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-[#0A0F1E]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    block px-4 py-3 rounded-lg text-[14px] font-medium transition-colors
                    ${isActive(link.path)
                      ? 'text-cyan-400 bg-cyan-500/8'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  to="/contact"
                  className="block px-4 py-3 rounded-xl text-center text-[14px] font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  Get Free Audit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
