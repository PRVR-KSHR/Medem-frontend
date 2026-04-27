import { ArrowRight, PhoneCall, Stethoscope, TestTube2, Pill, Activity, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WordsPullUp, ScrollRevealText } from "../../components/TypographyAnim.jsx";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <HeroSection t={t} />
      <QuickActionsSection t={t} />
      <PartnersScrollerSection t={t} />
      <ServicesPreviewSection t={t} />
      <MedicalTeamSection t={t} />
      <TestimonialsSection t={t} />
      <CTASection t={t} />
    </div>
  );
}

import heroVideo from "../../assets/partners/143379-782178675.mp4";
import emergencyBg from "../../assets/Service-bg/Emergency.png";
import doctorBg from "../../assets/Service-bg/Doctor.png";
import labBg from "../../assets/Service-bg/lab.png";
import medicineBg from "../../assets/Service-bg/medicine.png";

function HeroSection({ t }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <section className="h-[110vh] min-h-[660px] w-full relative bg-black">
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
              className="text-primary/75 text-base md:text-lg leading-[1.45] max-w-sm ml-2 md:ml-5"
            >
              {t('home.hero.description')}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-start">
                <Link to="/emergency" className="bg-red-500 w-full sm:w-auto text-white rounded-full flex justify-between items-center pl-6 pr-2 py-2 font-medium text-sm hover:bg-red-600 transition-colors">
                  {t('home.hero.emergency')}
                  <div className="bg-white/20 rounded-full w-8 h-8 ml-4 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4 text-white" />
                  </div>
                </Link>
                <div className="flex flex-col gap-2 w-full sm:w-auto items-center sm:items-end">
                  <Link to="/appointment" className="bg-primary w-full sm:w-auto text-black rounded-full flex justify-between items-center pl-6 pr-2 py-2 font-medium text-sm group hover:gap-2 transition-all">
                    {t('home.hero.bookAppointment')}
                    <div className="bg-black rounded-full w-8 h-8 ml-4 flex items-center justify-center shrink-0 transform group-hover:scale-105 transition-all">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </Link>
                  <p className="text-right text-white/90 font-medium sm:pr-4">
                    <span className="text-xs sm:text-sm mr-1">{t('home.hero.callPrefix')}</span>
                    <span className="text-sm border-b leading-tight sm:text-base text-red-500 font-semibold drop-shadow-[0_0_10px_rgba(248,113,113,0.45)]">
                      {t('home.hero.phoneNumber')}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickActionsSection({ t }) {
  const actions = [
    { title: t('home.quickActions.ambulance.title'), icon: Activity, path: "/emergency", desc: t('home.quickActions.ambulance.desc'), color: "text-red-400" },
    { title: t('home.quickActions.doctors.title'), icon: Stethoscope, path: "/doctors", desc: t('home.quickActions.doctors.desc'), color: "text-[#DEDBC8]" },
    { title: t('home.quickActions.labTests.title'), icon: TestTube2, path: "/lab-tests", desc: t('home.quickActions.labTests.desc'), color: "text-[#DEDBC8]" },
    { title: t('home.quickActions.medicines.title'), icon: Pill, path: "/medicine", desc: t('home.quickActions.medicines.desc'), color: "text-[#DEDBC8]" },
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

function PartnersScrollerSection({ t }) {
  const partnerModules = import.meta.glob('../../assets/partners/partner_*.png', { eager: true });
  const partnerImages = Object.values(partnerModules).map(mod => mod.default || mod);

  return (
    <section className="bg-black w-full overflow-hidden relative py-12 border-y border-[#DEDBC8]/5">
      <div className="max-w-7xl mx-auto mb-8 px-4 md:px-6">
        <h3 className="text-center text-[#DEDBC8]/40 text-xs font-bold tracking-widest uppercase">{t('home.partnersTitle')}</h3>
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

function ServicesPreviewSection({ t }) {
  return (
    <section className="min-h-[70vh] bg-black relative px-4 md:px-6 py-20 w-full overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.10] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            {t('home.servicesPreview.kicker')}
          </span>
          <h2 className="text-[#E1E0CC] text-3xl md:text-5xl font-serif italic mb-6">
            {t('home.servicesPreview.title')}
          </h2>
          <ScrollRevealText
            text={t('home.servicesPreview.description')}
            className="text-[#DEDBC8]/70 text-sm md:text-base justify-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { id: "emergency", title: t('home.servicesPreview.cards.emergency.title'), desc: t('home.servicesPreview.cards.emergency.desc'), icon: AlertTriangle, color: "text-red-400", bg: emergencyBg },
            { id: "doctor", title: t('home.servicesPreview.cards.doctor.title'), desc: t('home.servicesPreview.cards.doctor.desc'), icon: Stethoscope, color: "text-[#DEDBC8]", bg: doctorBg },
            { id: "lab-tests", title: t('home.servicesPreview.cards.labTests.title'), desc: t('home.servicesPreview.cards.labTests.desc'), icon: TestTube2, color: "text-[#DEDBC8]", bg: labBg },
            { id: "medicine", title: t('home.servicesPreview.cards.medicine.title'), desc: t('home.servicesPreview.cards.medicine.desc'), icon: Pill, color: "text-[#DEDBC8]", bg: medicineBg }
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
                className="relative block h-full overflow-hidden rounded-2xl p-8 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all group"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(6, 8, 13, 0.96) 0%, rgba(6, 8, 13, 0.84) 58%, rgba(6, 8, 13, 0.38) 100%), url(${service.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "right center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 backdrop-blur-[1.5px] opacity-70 pointer-events-none" />
                <div className="relative z-10 bg-[#212121]/80 w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="relative z-10 text-[#E1E0CC] text-xl font-medium mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{service.title}</h3>
                <p className="relative z-10 text-[#DEDBC8]/75 text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-[#DEDBC8] hover:text-white transition-colors text-sm font-medium group">
              {t('home.servicesPreview.viewAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </section>
  );
}

function MedicalTeamSection({ t }) {
  const members = [
    {
      name: t('home.medicalTeam.members.0.name'),
      speciality: t('home.medicalTeam.members.0.speciality'),
      experience: t('home.medicalTeam.members.0.experience'),
      shift: t('home.medicalTeam.members.0.shift')
    },
    {
      name: t('home.medicalTeam.members.1.name'),
      speciality: t('home.medicalTeam.members.1.speciality'),
      experience: t('home.medicalTeam.members.1.experience'),
      shift: t('home.medicalTeam.members.1.shift')
    },
    {
      name: t('home.medicalTeam.members.2.name'),
      speciality: t('home.medicalTeam.members.2.speciality'),
      experience: t('home.medicalTeam.members.2.experience'),
      shift: t('home.medicalTeam.members.2.shift')
    },
    {
      name: t('home.medicalTeam.members.3.name'),
      speciality: t('home.medicalTeam.members.3.speciality'),
      experience: t('home.medicalTeam.members.3.experience'),
      shift: t('home.medicalTeam.members.3.shift')
    }
  ];

  return (
    <section className="bg-black py-20 px-4 md:px-6 w-full border-t border-[#DEDBC8]/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-primary text-[10px] sm:text-xs tracking-[0.22em] uppercase mb-3">{t('home.medicalTeam.kicker')}</p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#E1E0CC] leading-tight mb-4">{t('home.medicalTeam.title')}</h2>
            <p className="text-[#DEDBC8]/65 text-sm md:text-base leading-relaxed">{t('home.medicalTeam.subtitle')}</p>
          </div>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm text-[#DEDBC8] hover:text-white transition-colors self-start md:self-auto"
          >
            {t('home.medicalTeam.cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="group bg-[#101010] border border-[#DEDBC8]/10 rounded-2xl p-6 shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
            >
              <div className="w-12 h-12 rounded-xl border border-[#DEDBC8]/20 bg-[#151515] text-[#E1E0CC] flex items-center justify-center text-sm font-medium mb-5">
                {member.name.split(' ').slice(-1)[0]?.slice(0, 2).toUpperCase()}
              </div>

              <h3 className="text-[#E1E0CC] text-lg font-medium mb-1">{member.name}</h3>
              <p className="text-primary text-sm mb-4">{member.speciality}</p>

              <div className="pt-4 border-t border-[#DEDBC8]/10 grid grid-cols-1 gap-2 text-xs text-[#DEDBC8]/65">
                <p>{member.experience}</p>
                <p>{member.shift}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ t }) {
  const reviews = [
    {
      text: t('home.testimonials.cards.0.text'),
      name: t('home.testimonials.cards.0.name'),
      role: t('home.testimonials.cards.0.role')
    },
    {
      text: t('home.testimonials.cards.1.text'),
      name: t('home.testimonials.cards.1.name'),
      role: t('home.testimonials.cards.1.role')
    },
    {
      text: t('home.testimonials.cards.2.text'),
      name: t('home.testimonials.cards.2.name'),
      role: t('home.testimonials.cards.2.role')
    }
  ];

  return (
    <section className="bg-black py-20 px-4 md:px-6 w-full border-t border-[#DEDBC8]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-4 bg-[#101010] border border-[#DEDBC8]/10 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
          <p className="text-primary text-[10px] sm:text-xs tracking-[0.22em] uppercase mb-3">{t('home.testimonials.kicker')}</p>
          <h2 className="text-3xl md:text-4xl font-serif italic text-[#E1E0CC] leading-tight mb-5">{t('home.testimonials.title')}</h2>
          <p className="text-[#DEDBC8]/60 text-sm leading-relaxed">{t('home.testimonials.subtitle')}</p>
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#DEDBC8]/15 bg-[#151515] text-xs text-[#DEDBC8]/80">
            <span className="text-primary">★</span>
            {t('home.testimonials.rating')}
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ y: 22, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#101010] border border-[#DEDBC8]/10 rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            >
              <p className="text-[#DEDBC8]/80 text-sm leading-relaxed mb-6 min-h-[130px]">“{review.text}”</p>
              <div className="pt-5 border-t border-[#DEDBC8]/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#E1E0CC] text-sm font-medium">{review.name}</p>
                  <p className="text-[#DEDBC8]/50 text-xs mt-1">{review.role}</p>
                </div>
                <span className="text-primary text-xs tracking-[0.18em]">★★★★★</span>
              </div>
            </motion.article>
          ))}
          <div className="md:col-span-3 flex justify-center md:justify-end pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-[#DEDBC8] hover:text-white transition-colors"
            >
              {t('home.testimonials.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ t }) {
    return (
        <section className="bg-black py-20 px-4 md:px-6 w-full">
            <div className="bg-primary bg-noise rounded-[2rem] p-10 sm:p-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left border border-white/20 shadow-[0_20px_40px_rgba(222,219,200,0.1)] relative overflow-hidden">
                <div className="absolute -right-[10%] -bottom-[20%] w-[50%] h-[150%] bg-white/20 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 w-full md:w-3/5">
                  <h2 className="text-black text-3xl md:text-5xl font-serif italic mb-4 tracking-tight">{t('home.cta.title')}</h2>
                  <p className="text-black/80 text-sm md:text-lg max-w-lg leading-relaxed">{t('home.cta.subtitle')}</p>
                </div>
                
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                    <a href="#" className="bg-black text-[#DEDBC8] px-6 py-4 rounded-2xl inline-flex items-center justify-center gap-4 hover:bg-[#1a1a1a] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <svg viewBox="0 0 512 512" className="w-8 h-8" fill="currentColor">
                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                        </svg>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#DEDBC8]/60 leading-none mb-1">{t('home.cta.getItOn')}</span>
                          <span className="text-lg font-medium leading-none tracking-tight">{t('hero.playStore')}</span>
                        </div>
                    </a>
                    <a href="#" className="bg-transparent border-2 border-black/20 text-black px-6 py-4 rounded-2xl inline-flex items-center justify-center gap-4 hover:bg-black/5 hover:border-black/40 hover:scale-105 transition-all">
                        <svg viewBox="0 0 384 512" className="w-8 h-8" fill="currentColor">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 233.8 2.6 307.4 20.7 381 44.6 416.5c11.9 17.6 26.6 36.7 45.4 36.7 18.5 0 25.3-11.3 47.7-11.3 22.1 0 28.5 11.3 48 11.3 19.2 0 32.5-17.6 44.3-34.8 13.9-19.7 19.5-38.5 19.9-39.7-1-1.3-35.9-13.7-36.1-50.5zM228.3 103.8c10.4-12.7 17.1-29.9 15.2-47.3-14.6 1.1-32.9 10.4-44.1 23.3-9.1 10.4-17.4 28.5-15 45.2 16.7 1.3 33.1-8.5 43.9-21.2z"/>
                        </svg>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 leading-none mb-1">{t('home.cta.downloadOnThe')}</span>
                          <span className="text-lg font-medium leading-none tracking-tight">{t('hero.appStore')}</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
