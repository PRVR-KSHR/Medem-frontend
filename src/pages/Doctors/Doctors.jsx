import { Search, Filter, Star, Clock, MapPin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import doctorsHeroBg from "../../assets/doctors_hero_bg.png";
import HowItWorksSection from "../../components/HowItWorksSection.jsx";

export default function Doctors() {
  const { t } = useTranslation();

  const DOCTORS = [
    {
      id: "dr-marcus",
      name: t('doctorsPage.doctors.drMarcus.name'),
      spec: t('doctorsPage.doctors.drMarcus.spec'),
      exp: t('doctorsPage.doctors.drMarcus.exp'),
      rating: 4.9,
      loc: t('doctorsPage.doctors.drMarcus.loc'),
      fee: "$150",
      consultations: "1000+ consultations",
      tags: ["Ablation", "Diagnostics"],
      status: "On line/Offline",
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500&h=500"
    },
    {
      id: "dr-elena",
      name: t('doctorsPage.doctors.drElena.name'),
      spec: t('doctorsPage.doctors.drElena.spec'),
      exp: t('doctorsPage.doctors.drElena.exp'),
      rating: 4.8,
      loc: t('doctorsPage.doctors.drElena.loc'),
      fee: "$180",
      consultations: "1400+ consultations",
      tags: ["Neuro", "MRI"],
      status: "Offline",
      img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=500&h=500"
    },
    {
      id: "dr-james",
      name: t('doctorsPage.doctors.drJames.name'),
      spec: t('doctorsPage.doctors.drJames.spec'),
      exp: t('doctorsPage.doctors.drJames.exp'),
      rating: 4.7,
      loc: t('doctorsPage.doctors.drJames.loc'),
      fee: "$90",
      consultations: "600+ consultations",
      tags: ["Acute care", "Preventive"],
      status: "Offline",
      img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=500&h=500"
    },
    {
      id: "dr-sarah",
      name: t('doctorsPage.doctors.drSarah.name'),
      spec: t('doctorsPage.doctors.drSarah.spec'),
      exp: t('doctorsPage.doctors.drSarah.exp'),
      rating: 4.9,
      loc: t('doctorsPage.doctors.drSarah.loc'),
      fee: "$120",
      consultations: "2000+ consultations",
      tags: ["Dermatology", "Pediatrics"],
      status: "Offline",
      img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500&h=500"
    },
  ];

  const tags = [
    t('doctorsPage.filters.all'),
    t('doctorsPage.filters.cardiologist'),
    t('doctorsPage.filters.neurologist'),
    t('doctorsPage.filters.dermatologist'),
    t('doctorsPage.filters.pediatrician'),
    t('doctorsPage.filters.orthopedic')
  ];

  return (
    <div className="w-full flex-1 bg-black relative">
      {/* Sticky Background — stays fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${doctorsHeroBg})` }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Hero Text Area */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            {t('doctorsPage.kicker')}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#E1E0CC] drop-shadow-lg">
            {t('doctorsPage.title')}
          </h1>
          <p className="text-[#DEDBC8]/80 text-sm md:text-lg max-w-2xl mx-auto mt-6 drop-shadow-md">
            {t('doctorsPage.description')}
          </p>
        </motion.div>
      </section>

      {/* Gradient Fade into Content */}
      <div className="relative z-10 h-40 bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none" />

      {/* Content Section */}
      <section className="relative z-10 bg-black/80 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search, Filter & Tags */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 border-b border-[#dc2626]/20 pb-4 mt-[-10px]">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {tags.map((tag, i) => (
                <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full border text-xs font-medium transition-colors ${i === 0 ? "bg-[#dc2626] text-white border-[#dc2626]" : "bg-transparent text-[#DEDBC8]/80 border-[#DEDBC8]/20 hover:border-[#dc2626]/50"}`}>
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#DEDBC8]/50" />
                <input
                  type="text"
                  placeholder={t('doctorsPage.searchPlaceholder')}
                  className="w-full bg-[#101010]/80 border border-[#dc2626]/25 rounded-full py-2 pl-9 pr-3 text-xs text-[#E1E0CC] focus:outline-none focus:border-[#dc2626]/50 transition-colors placeholder:text-[#DEDBC8]/40"
                />
              </div>
              <button className="bg-[#101010]/80 border border-[#dc2626]/25 rounded-full p-2 hover:bg-[#151515] transition-colors hover:border-[#dc2626]/50 flex shrink-0 items-center justify-center">
                <Filter className="w-3.5 h-3.5 text-[#DEDBC8]" />
              </button>
            </div>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {DOCTORS.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-[#0a0c10]/90 backdrop-blur-sm border border-[#dc2626]/25 rounded-3xl p-4 sm:p-5 shadow-[0_16px_36px_rgba(0,0,0,0.45)] flex flex-col hover:border-[#dc2626]/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-white/20 relative bg-[#151922] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                    <img
                      src={doc.img}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(doc.name) + "&background=111827&color=e5e7eb&size=256";
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-300/20">
                    <Star className="w-3 h-3 fill-current" /> {doc.rating}
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="text-[#E1E0CC] text-lg leading-tight font-medium tracking-tight flex items-center gap-2">
                      {doc.name}
                      <BadgeCheck className="w-4 h-4 text-sky-400/90" />
                    </h3>
                    <p className="text-[#DEDBC8]/75 text-sm mt-1">{doc.spec}</p>
                  </div>

                  <div className="space-y-1 text-[#DEDBC8]/55 text-xs">
                    <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {doc.exp}</p>
                    <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {doc.loc}</p>
                    <p className="text-[#DEDBC8]/45">{doc.consultations}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#DEDBC8]/65">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 border-t border-white/8 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[#E1E0CC] text-2xl leading-none font-semibold tracking-tight">{doc.fee}</p>
                      <p className="text-[#DEDBC8]/45 text-xs mt-1">{doc.status}</p>
                    </div>
                    <Link to={`/appointment?doctor=${doc.id}`} className="bg-primary text-black hover:bg-white px-4 py-2 rounded-full text-xs font-semibold transition-colors">
                      {t('doctorsPage.bookVisit')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <HowItWorksSection t={t} />
    </div>
  );
}
