import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0F1E]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(37,99,235,0.1)] h-20">
      <div className="flex justify-between items-center px-8 h-full max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-white tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          RedBirds
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors hidden sm:block">
            <Shield size={20} />
          </button>
          <Link
            to="/contact"
            className="hidden sm:inline-flex bg-primary-container text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all"
          >
            Get Started
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0F1E]/95 backdrop-blur-xl border-t border-white/10 absolute w-full">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="bg-primary-container text-white px-6 py-3 rounded-lg font-bold text-center mt-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/5 pt-12 pb-8 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            RedBirds
          </div>
          <p className="text-sm text-slate-400">
            © 2024 RedBirds Cybersecurity. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="text-sm text-slate-400 hover:text-blue-500 transition-colors" to="#">Privacy Policy</Link>
          <Link className="text-sm text-slate-400 hover:text-blue-500 transition-colors" to="#">Terms of Service</Link>
          <Link className="text-sm text-slate-400 hover:text-blue-500 transition-colors" to="#">Shield Architecture</Link>
          <Link className="text-sm text-slate-400 hover:text-blue-500 transition-colors" to="#">Global Infrastructure</Link>
        </div>

      </div>
    </footer>
  )
}

function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#11131b", color: "#e1e2ed" }}>
      <Navbar />
      <div className="pt-20">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
