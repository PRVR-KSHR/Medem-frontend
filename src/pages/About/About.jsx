import { motion } from "motion/react";
import { Activity, ShieldCheck, HeartPulse, Globe, Ambulance, Stethoscope, FlaskConical, Pill } from "lucide-react";
import { useTranslation } from "react-i18next";
import aboutHeroBg from "../../assets/about_hero_bg.png";

export default function About() {
  const { t } = useTranslation();

  const VALUES = [
    { title: t('aboutPage.values.rapidResponse.title'), desc: t('aboutPage.values.rapidResponse.desc'), icon: Activity },
    { title: t('aboutPage.values.verified.title'), desc: t('aboutPage.values.verified.desc'), icon: ShieldCheck },
    { title: t('aboutPage.values.patientFirst.title'), desc: t('aboutPage.values.patientFirst.desc'), icon: HeartPulse },
    { title: t('aboutPage.values.universal.title'), desc: t('aboutPage.values.universal.desc'), icon: Globe },
  ];

  const WHAT_WE_DO = [
    { title: t('aboutPage.whatWeDo.items.0.title'), desc: t('aboutPage.whatWeDo.items.0.desc'), icon: Ambulance },
    { title: t('aboutPage.whatWeDo.items.1.title'), desc: t('aboutPage.whatWeDo.items.1.desc'), icon: Stethoscope },
    { title: t('aboutPage.whatWeDo.items.2.title'), desc: t('aboutPage.whatWeDo.items.2.desc'), icon: FlaskConical },
    { title: t('aboutPage.whatWeDo.items.3.title'), desc: t('aboutPage.whatWeDo.items.3.desc'), icon: Pill },
  ];

  const IMPACT = [
    { label: t('aboutPage.impact.0.label'), value: t('aboutPage.impact.0.value') },
    { label: t('aboutPage.impact.1.label'), value: t('aboutPage.impact.1.value') },
    { label: t('aboutPage.impact.2.label'), value: t('aboutPage.impact.2.value') },
    { label: t('aboutPage.impact.3.label'), value: t('aboutPage.impact.3.value') },
  ];

  return (
    <div className="w-full flex-1 bg-black relative">
      {/* Sticky Background — stays fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${aboutHeroBg})` }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Hero Text Area */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            {t('aboutPage.kicker')}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#E1E0CC] mb-8 drop-shadow-lg">
            {t('aboutPage.title')}
          </h1>
          <p className="text-[#DEDBC8]/90 text-lg md:text-xl leading-relaxed drop-shadow-md">
            {t('aboutPage.description')}
          </p>
        </motion.div>
      </section>

      {/* Gradient Fade into Content */}
      <div className="relative z-10 h-40 bg-gradient-to-b from-transparent via-black/50 to-black/70 pointer-events-none" />

      {/* Content Section */}
      <section className="relative z-10 bg-black/80 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-20">
          {/* Who We Are */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-7 bg-[#101010] border border-[#dc2626]/25 rounded-3xl p-8 md:p-10 shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
              <h2 className="text-2xl md:text-3xl font-serif text-[#E1E0CC] mb-4">{t('aboutPage.whoWeAre.title')}</h2>
              <p className="text-[#DEDBC8]/70 text-sm md:text-base leading-relaxed mb-4">{t('aboutPage.whoWeAre.p1')}</p>
              <p className="text-[#DEDBC8]/65 text-sm md:text-base leading-relaxed">{t('aboutPage.whoWeAre.p2')}</p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {IMPACT.map((item) => (
                <div key={item.label} className="bg-[#101010] border border-[#dc2626]/25 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
                  <p className="text-[#E1E0CC] text-2xl md:text-3xl font-semibold tracking-tight">{item.value}</p>
                  <p className="text-[#DEDBC8]/60 text-xs md:text-sm mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Do */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-serif text-[#E1E0CC] border-b border-[#DEDBC8]/10 pb-4 inline-block pr-12">
                {t('aboutPage.whatWeDo.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHAT_WE_DO.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="bg-[#101010] border border-[#dc2626]/25 rounded-2xl p-7 hover:border-[#dc2626]/50 transition-colors shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
                >
                  <div className="bg-[#1d1d1d] w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-[#E1E0CC] text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-[#DEDBC8]/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core Values Section */}
          <div>
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-[#E1E0CC] border-b border-[#DEDBC8]/10 pb-4 inline-block pr-12">
                {t('aboutPage.coreValues')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#101010] border border-[#dc2626]/25 rounded-2xl p-8 hover:border-[#dc2626]/50 transition-colors shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
                >
                  <div className="bg-[#212121] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <val.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-[#E1E0CC] text-lg font-medium mb-2">{val.title}</h3>
                  <p className="text-[#DEDBC8]/60 text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-[#101010] rounded-[2rem] p-8 md:p-16 border border-[#dc2626]/25 shadow-[0_16px_36px_rgba(0,0,0,0.45)] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
            <h2 className="text-2xl md:text-4xl font-serif text-[#E1E0CC] max-w-2xl mx-auto leading-relaxed relative z-10">
              {t('aboutPage.mission')}
            </h2>
            <p className="text-[#DEDBC8]/65 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-6 relative z-10">
              {t('aboutPage.missionSubtext')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
