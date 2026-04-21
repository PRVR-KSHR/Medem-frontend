import { Outlet, Link, useLocation } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import LocationWidget from '../../components/LocationWidget/LocationWidget.jsx';
import logo from '../../assets/logo.png';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Preserved from old Layout
  const [showEmergency, setShowEmergency] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <div className="bg-black text-[#DEDBC8] min-h-screen selection:bg-primary/30 flex flex-col font-sans">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${(!isHome || isScrolled || isMenuOpen) ? "bg-[#101010]/80 backdrop-blur-md border-b border-[#DEDBC8]/10" : "bg-transparent border-transparent pt-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="MedEm Logo" className="h-[52px] w-auto object-contain transition-transform group-hover:scale-105" />
              <span className="font-serif italic text-2xl tracking-wide text-[#E1E0CC]">MedEm</span>
            </Link>
            
            <nav className="hidden md:flex gap-8">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Doctors", path: "/doctors" },
                { name: "Emergency", path: "/emergency", emergency: true },
              ].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-1 text-sm tracking-wide transition-colors ${
                    link.emergency 
                      ? isActive ? "text-red-400 font-bold" : "text-red-500 hover:text-red-400 font-bold" 
                      : isActive ? "text-[#E1E0CC] font-medium" : "text-[#DEDBC8]/80 hover:text-[#E1E0CC]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute -bottom-[8px] left-0 right-0 h-[2px] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] ${link.emergency ? "bg-red-400 shadow-red-400/50" : "bg-[#DEDBC8]"}`}
                    />
                  )}
                </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm text-[#DEDBC8]/80 hover:text-[#E1E0CC]">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#DEDBC8] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
              >
                Register
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#DEDBC8]/80 hover:text-[#E1E0CC]"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#101010] border-b border-[#DEDBC8]/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Doctors", path: "/doctors" },
                { name: "Emergency", path: "/emergency", emergency: true },
                { name: "Login", path: "/login" },
                { name: "Register", path: "/register" },
              ].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    link.emergency 
                      ? isActive ? "bg-[#212121] text-red-400" : "text-red-500 hover:bg-[#212121] hover:text-red-400" 
                      : isActive ? "bg-[#212121] text-[#E1E0CC]" : "text-[#DEDBC8]/80 hover:text-[#E1E0CC] hover:bg-[#212121]"
                  }`}
                >
                  {link.name}
                </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col relative w-full">
        <Outlet context={{ showEmergency, setShowEmergency, showSignIn, setShowSignIn }} />
      </main>

      <footer className="bg-black px-4 sm:px-6 lg:px-8 pb-6 pt-12 mt-auto w-full">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-[#1a1a1a] relative overflow-hidden border border-[#DEDBC8]/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group">
          
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

          <div className="relative z-10 px-6 sm:px-12 pt-16 pb-12 flex flex-col">
            <div className="flex justify-center md:justify-start mb-8 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              <img src={logo} alt="MedEm Logo" className="h-16 sm:h-20 md:h-28 w-auto object-contain" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-4 md:mt-8">
              <div className="md:col-span-5 flex flex-col justify-between">
                <p className="text-[#DEDBC8]/70 text-base max-w-sm leading-relaxed mb-8">
                  Rapid emergency response & comprehensive medical coverage. We connect you with top doctors, labs, and pharmacies instantly.
                </p>
                <div>
                  <Link to="/emergency" className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-8 py-3 rounded-full transition-colors inline-block font-medium text-sm shadow-[0_0_20px_rgba(248,113,113,0.1)]">
                    Emergency 24/7 Dispatch
                  </Link>
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:pl-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#E1E0CC] font-medium tracking-widest text-[10px] uppercase mb-2 border-b border-[#DEDBC8]/10 pb-3">Platform</h3>
                  <Link to="/services" className="text-[#DEDBC8]/60 hover:text-[#E1E0CC] text-sm transition-colors">Services</Link>
                  <Link to="/doctors" className="text-[#DEDBC8]/60 hover:text-[#E1E0CC] text-sm transition-colors">Find a Doctor</Link>
                  <Link to="/hospitals" className="text-[#DEDBC8]/60 hover:text-[#E1E0CC] text-sm transition-colors">Hospitals</Link>
                  <Link to="/medicine" className="text-[#DEDBC8]/60 hover:text-[#E1E0CC] text-sm transition-colors">Pharmacy</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#E1E0CC] font-medium tracking-widest text-[10px] uppercase mb-2 border-b border-[#DEDBC8]/10 pb-3">Company</h3>
                  <Link to="/about" className="text-[#DEDBC8]/60 hover:text-[#E1E0CC] text-sm transition-colors">Our Story</Link>
                  <Link to="/contact" className="text-[#DEDBC8]/60 hover:text-[#E1E0CC] text-sm transition-colors">Contact</Link>
                  <Link to="/register" className="text-[#DEDBC8]/60 hover:text-[#E1E0CC] text-sm transition-colors">Join as Doctor</Link>
                </div>
                <div className="flex flex-col gap-4 col-span-2 md:col-span-1 border-t border-[#DEDBC8]/10 pt-8 md:border-none md:pt-0">
                  <h3 className="text-[#E1E0CC] font-medium tracking-widest text-[10px] uppercase mb-2 border-b border-[#DEDBC8]/10 pb-3">Connect</h3>
                  <p className="text-[#DEDBC8]/50 text-xs">Stay updated on the latest platform features and healthcare networks.</p>
                  <div className="flex gap-3 mt-2">
                    <div className="w-10 h-10 rounded-full bg-[#151515] hover:bg-[#212121] border border-[#DEDBC8]/10 hover:border-[#DEDBC8]/40 cursor-pointer transition-colors flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#DEDBC8]/60" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#151515] hover:bg-[#212121] border border-[#DEDBC8]/10 hover:border-[#DEDBC8]/40 cursor-pointer transition-colors flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#DEDBC8]/60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-[#DEDBC8]/10 px-8 py-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-[#DEDBC8]/50 text-xs tracking-wide">&copy; {new Date().getFullYear()} MedEm Platform</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-[#DEDBC8]/40">
              <a href="#" className="hover:text-[#DEDBC8] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#DEDBC8] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
