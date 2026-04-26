import { Search, Filter, Star, Clock, MapPin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

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
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
              {t('doctorsPage.kicker')}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif italic text-[#E1E0CC]">
              {t('doctorsPage.title')}
            </h1>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DEDBC8]/50" />
              <input 
                type="text" 
                placeholder={t('doctorsPage.searchPlaceholder')}
                className="w-full bg-[#101010] border border-[#DEDBC8]/20 rounded-full py-3 pl-12 pr-4 text-sm text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]/50 transition-colors placeholder:text-[#DEDBC8]/40"
              />
            </div>
            <button className="bg-[#101010] border border-[#DEDBC8]/20 rounded-full p-3 hover:bg-[#151515] transition-colors">
              <Filter className="w-5 h-5 text-[#DEDBC8]" />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {tags.map((tag, i) => (
            <button key={i} className={`whitespace-nowrap px-5 py-2 rounded-full border text-sm transition-colors ${i === 0 ? "bg-[#DEDBC8] text-black border-[#DEDBC8]" : "bg-transparent text-[#DEDBC8] border-[#DEDBC8]/20 hover:border-[#DEDBC8]/50"}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {DOCTORS.map((doc, i) => (
            <motion.div 
              key={doc.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#0f1219] border border-white/8 rounded-3xl p-4 sm:p-5 shadow-[0_10px_24px_rgba(0,0,0,0.32)] flex flex-col hover:border-white/15 transition-colors group"
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
    </div>
  );
}
