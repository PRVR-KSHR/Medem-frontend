import { ArrowRight, PhoneCall, Stethoscope, TestTube2, Pill, Activity, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { WordsPullUp, ScrollRevealText } from "../../components/TypographyAnim.jsx";

export default function Home() {
  const { showEmergency, setShowEmergency } = useOutletContext();
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5000', []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setNearbyHospitals([
          { name: 'City General Hospital', distance: '5.2 km', phone: '+91-98765-43210' },
          { name: 'Rural Medical Center', distance: '8.7 km', phone: '+91-98765-43211' },
          { name: 'Government Hospital', distance: '12.3 km', phone: '+91-98765-43212' },
          { name: 'District Medical College', distance: '18.9 km', phone: '+91-98765-43213' },
          { name: 'Tehsil Hospital', distance: '22.1 km', phone: '+91-98765-43214' }
        ]);
      });
    }
  }, []);

  function validateContact({ name, email, message }) {
    const errs = {};
    if (!name || name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Please enter a valid email address.';
    if (!message || message.trim().length < 10) errs.message = 'Please enter a message (min 10 characters).';
    return errs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const nextErrors = validateContact(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitState({ status: 'loading', message: '' });
    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok) {
        const fields = json?.error?.fields || [];
        const fieldMap = {};
        for (const f of fields) fieldMap[f.field] = f.message;
        setErrors(fieldMap);
        setSubmitState({ status: 'error', message: 'Please fix the highlighted fields.' });
        return;
      }
      setSubmitState({ status: 'success', message: 'Message sent successfully.' });
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      setSubmitState({ status: 'error', message: 'Could not send message. Please try again.' });
    }
  }

  return (
    <div className="w-full">
      <HeroSection />
      <QuickActionsSection />
      <PartnersScrollerSection />
      <ServicesPreviewSection />
      <ContactSection 
        form={form} 
        setForm={setForm} 
        errors={errors} 
        submitState={submitState} 
        onSubmit={onSubmit} 
      />
      <CTASection />
    </div>
  );
}

import heroVideo from "../../assets/partners/143379-782178675.mp4";
import LocationWidget from "../../components/LocationWidget/LocationWidget.jsx";

function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <section className="h-[100vh] min-h-[600px] w-full relative bg-black">
      <div className="w-full h-full relative overflow-hidden bg-[#1a1a1a] group">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

        <div className="absolute bottom-[120px] md:bottom-16 left-0 right-0 w-full px-6 sm:px-10 md:px-16 pb-8 md:pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end z-20">
          <div className="md:col-span-8 flex flex-col">
            <WordsPullUp
              text="MedEm"
              showAsterisk
              className="text-[20vw] sm:text-[18vw] md:text-[16vw] font-medium leading-[0.85] tracking-[-0.05em] text-[#E1E0CC]"
            />
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 pb-2">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-primary/70 text-sm md:text-base leading-[1.4] max-w-sm"
            >
              Rapid emergency response and comprehensive medical care, accessible anytime. We connect you with top doctors, labs, and pharmacies instantly.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/emergency" className="bg-red-500 text-white rounded-full flex justify-between items-center pl-6 pr-2 py-2 font-medium text-sm hover:bg-red-600 transition-colors">
                Emergency 24/7
                <div className="bg-white/20 rounded-full w-8 h-8 ml-4 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 text-white" />
                </div>
              </Link>
              <Link to="/appointment" className="bg-primary text-black rounded-full flex justify-between items-center pl-6 pr-2 py-2 font-medium text-sm group hover:gap-2 transition-all">
                Book Visit
                <div className="bg-black rounded-full w-8 h-8 ml-4 flex items-center justify-center transform group-hover:scale-105 transition-all">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-30 border-t border-[#DEDBC8]/5">
          <LocationWidget />
        </div>
      </div>
    </section>
  );
}

function QuickActionsSection() {
  const actions = [
    { title: "Ambulance", icon: Activity, path: "/emergency", desc: "GPS Dispatch", color: "text-red-400" },
    { title: "Doctors", icon: Stethoscope, path: "/doctors", desc: "Book OPD", color: "text-[#DEDBC8]" },
    { title: "Lab Tests", icon: TestTube2, path: "/lab-tests", desc: "Home Collect", color: "text-[#DEDBC8]" },
    { title: "Medicines", icon: Pill, path: "/medicine", desc: "2hr Delivery", color: "text-[#DEDBC8]" },
  ];

  return (
    <section className="bg-black py-8 px-4 md:px-6 w-full relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <Link key={i} to={action.path} className="group">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
              className="bg-[#151515] hover:bg-[#212121] bg-noise border border-[#DEDBC8]/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors"
            >
              <action.icon className={`w-8 h-8 ${action.color} mb-4`} />
              <h3 className="text-[#E1E0CC] font-medium text-lg">{action.title}</h3>
              <p className="text-[#DEDBC8]/60 text-xs mt-1">{action.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PartnersScrollerSection() {
  const partnerModules = import.meta.glob('../../assets/partners/partner_*.png', { eager: true });
  const partnerImages = Object.values(partnerModules).map(mod => mod.default || mod);

  return (
    <section className="bg-black w-full overflow-hidden relative py-12 border-y border-[#DEDBC8]/5">
      <div className="max-w-7xl mx-auto mb-8 px-4 md:px-6">
        <h3 className="text-center text-[#DEDBC8]/40 text-xs font-bold tracking-widest uppercase">Trusted By Leading Healthcare Networks</h3>
      </div>
      
      <div className="relative w-full flex">
        <motion.div 
          animate={{ x: [0, "-50%"] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex w-max items-center gap-16 sm:gap-24 px-8"
        >
           {[...partnerImages, ...partnerImages].map((src, i) => (
             <img 
               key={i} 
               src={src.default || src} 
               alt={`Partner ${i}`} 
               className="h-8 md:h-12 w-auto opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 object-contain" 
             />
           ))}
        </motion.div>
        
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

function ServicesPreviewSection() {
  return (
    <section className="min-h-[70vh] bg-black relative px-4 md:px-6 py-20 w-full overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.10] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            Integrated Healthcare
          </span>
          <h2 className="text-[#E1E0CC] text-3xl md:text-5xl font-serif italic mb-6">
            Everything you need for your health, in one unified platform.
          </h2>
          <ScrollRevealText
            text="From instant emergency dispatch localized via GPS to seamless telemedicine consultations and specialized hospital sourcing. MedEm is the connective tissue of modern healthcare."
            className="text-[#DEDBC8]/70 text-sm md:text-base justify-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { id: "emergency", title: "Emergency Care", desc: "150km radius rapid response dispatch.", icon: AlertTriangle, color: "text-red-400" },
            { id: "doctor", title: "Doctor Consultation", desc: "Book OPD visits with specialists.", icon: Stethoscope, color: "text-[#DEDBC8]" },
            { id: "lab-tests", title: "Lab Tests Booking", desc: "Home sample collection and reports.", icon: TestTube2, color: "text-[#DEDBC8]" },
            { id: "medicine", title: "Medicine Delivery", desc: "Generic and branded meds delivered.", icon: Pill, color: "text-[#DEDBC8]" }
          ].map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/services/${service.id}`}
                className="block h-full bg-[#101010] hover:bg-[#151515] rounded-2xl p-8 border border-[#DEDBC8]/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all group"
              >
                <div className="bg-[#212121] w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-[#DEDBC8]/5 group-hover:scale-110 transition-transform">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="text-[#E1E0CC] text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-[#DEDBC8]/60 text-sm leading-relaxed">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-[#DEDBC8] hover:text-white transition-colors text-sm font-medium group">
              View all services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ form, setForm, errors, submitState, onSubmit }) {
  return (
    <section className="bg-[#101010] py-20 px-4 md:px-6 w-full border-t border-[#DEDBC8]/10">
      <div className="max-w-4xl mx-auto bg-black p-8 md:p-12 rounded-3xl border border-[#DEDBC8]/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif italic text-[#E1E0CC] mb-2">Get in Touch</h2>
          <p className="text-[#DEDBC8]/60 text-sm">Have a medical inquiry or need support? Reach out securely.</p>
        </div>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-[#DEDBC8] text-sm tracking-wide">Full Name</span>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                className="bg-[#151515] border border-[#DEDBC8]/20 focus:border-primary text-white rounded-lg px-4 py-3 outline-none transition-colors"
                placeholder="John Doe"
              />
              {errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
            </label>
            
            <label className="flex flex-col gap-2">
              <span className="text-[#DEDBC8] text-sm tracking-wide">Email</span>
              <input 
                type="email" 
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                className="bg-[#151515] border border-[#DEDBC8]/20 focus:border-primary text-white rounded-lg px-4 py-3 outline-none transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
            </label>
          </div>
          
          <label className="flex flex-col gap-2">
            <span className="text-[#DEDBC8] text-sm tracking-wide">Message</span>
            <textarea 
              value={form.message}
              onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
              rows="4"
              className="bg-[#151515] border border-[#DEDBC8]/20 focus:border-primary text-white rounded-lg px-4 py-3 outline-none transition-colors resize-none"
              placeholder="How can we help?"
            ></textarea>
            {errors.message && <span className="text-red-400 text-xs">{errors.message}</span>}
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              type="submit" 
              disabled={submitState.status === 'loading'}
              className="bg-primary text-black font-medium px-8 py-3 rounded-full hover:bg-white transition-colors"
            >
              {submitState.status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitState.message && (
              <span className={`text-sm ${submitState.status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {submitState.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function CTASection() {
    return (
        <section className="bg-black py-20 px-4 md:px-6 w-full">
            <div className="bg-primary bg-noise rounded-[2rem] p-10 sm:p-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left border border-white/20 shadow-[0_20px_40px_rgba(222,219,200,0.1)] relative overflow-hidden">
                <div className="absolute -right-[10%] -bottom-[20%] w-[50%] h-[150%] bg-white/20 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 w-full md:w-3/5">
                    <h2 className="text-black text-3xl md:text-5xl font-serif italic mb-4 tracking-tight">Take MedEm everywhere.</h2>
                    <p className="text-black/80 text-sm md:text-lg max-w-lg leading-relaxed">Get instant access to top doctors, 24/7 emergency dispatch, and your live medical records right from your pocket. Download the app today.</p>
                </div>
                
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                    <a href="#" className="bg-black text-[#DEDBC8] px-6 py-4 rounded-2xl inline-flex items-center justify-center gap-4 hover:bg-[#1a1a1a] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <svg viewBox="0 0 512 512" className="w-8 h-8" fill="currentColor">
                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                        </svg>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#DEDBC8]/60 leading-none mb-1">Get it on</span>
                            <span className="text-lg font-medium leading-none tracking-tight">Google Play</span>
                        </div>
                    </a>
                    <a href="#" className="bg-transparent border-2 border-black/20 text-black px-6 py-4 rounded-2xl inline-flex items-center justify-center gap-4 hover:bg-black/5 hover:border-black/40 hover:scale-105 transition-all">
                        <svg viewBox="0 0 384 512" className="w-8 h-8" fill="currentColor">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 233.8 2.6 307.4 20.7 381 44.6 416.5c11.9 17.6 26.6 36.7 45.4 36.7 18.5 0 25.3-11.3 47.7-11.3 22.1 0 28.5 11.3 48 11.3 19.2 0 32.5-17.6 44.3-34.8 13.9-19.7 19.5-38.5 19.9-39.7-1-1.3-35.9-13.7-36.1-50.5zM228.3 103.8c10.4-12.7 17.1-29.9 15.2-47.3-14.6 1.1-32.9 10.4-44.1 23.3-9.1 10.4-17.4 28.5-15 45.2 16.7 1.3 33.1-8.5 43.9-21.2z"/>
                        </svg>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 leading-none mb-1">Download on the</span>
                            <span className="text-lg font-medium leading-none tracking-tight">App Store</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
