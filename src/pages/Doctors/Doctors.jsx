import { Search, Filter, Star, Clock, MapPin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const DOCTORS = [
  { id: "dr-marcus", name: "Dr. Marcus Chen", spec: "Cardiologist", exp: "15+ Years", rating: 4.9, reviews: 312, loc: "City General", fee: "$150", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "dr-elena", name: "Dr. Elena Rostova", spec: "Neurologist", exp: "10 Years", rating: 4.8, reviews: 184, loc: "Apex Center", fee: "$180", img: "https://images.unsplash.com/photo-1594824432258-2904b39dc1e1?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "dr-james", name: "Dr. James Wilson", spec: "General Physician", exp: "22 Years", rating: 4.7, reviews: 520, loc: "Metro Hub", fee: "$90", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: "dr-sarah", name: "Dr. Sarah Jenkins", spec: "Dermatologist", exp: "8 Years", rating: 4.9, reviews: 405, loc: "Skin Clinic", fee: "$120", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400" },
];

export default function Doctors() {
  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
              Medical Professionals
            </span>
            <h1 className="text-3xl md:text-5xl font-serif italic text-[#E1E0CC]">
              Find a Doctor
            </h1>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DEDBC8]/50" />
              <input 
                type="text" 
                placeholder="Search doctors, specialties..."
                className="w-full bg-[#101010] border border-[#DEDBC8]/20 rounded-full py-3 pl-12 pr-4 text-sm text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]/50 transition-colors placeholder:text-[#DEDBC8]/40"
              />
            </div>
            <button className="bg-[#101010] border border-[#DEDBC8]/20 rounded-full p-3 hover:bg-[#151515] transition-colors">
              <Filter className="w-5 h-5 text-[#DEDBC8]" />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {["All", "Cardiologist", "Neurologist", "Dermatologist", "Pediatrician", "Orthopedic"].map((tag, i) => (
            <button key={i} className={`whitespace-nowrap px-5 py-2 rounded-full border text-sm transition-colors ${i === 0 ? "bg-[#DEDBC8] text-black border-[#DEDBC8]" : "bg-transparent text-[#DEDBC8] border-[#DEDBC8]/20 hover:border-[#DEDBC8]/50"}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {DOCTORS.map((doc, i) => (
            <motion.div 
              key={doc.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#101010] border border-[#DEDBC8]/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row gap-6 hover:border-[#DEDBC8]/30 transition-colors group"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-2 border-[#DEDBC8]/10 relative">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[#E1E0CC] text-xl font-medium flex items-center gap-2">
                      {doc.name}
                      <BadgeCheck className="w-4 h-4 text-blue-400" />
                    </h3>
                    <p className="text-primary text-sm">{doc.spec}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-500 px-2 py-1 rounded text-xs font-medium">
                    <Star className="w-3 h-3 fill-current" /> {doc.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#DEDBC8]/60 text-sm mb-6 mt-4">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {doc.exp}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {doc.loc}</span>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#DEDBC8]/10 pt-4">
                  <span className="text-[#E1E0CC] font-medium">{doc.fee} <span className="text-[#DEDBC8]/50 text-xs font-normal">/ visit</span></span>
                  <Link to={`/appointment?doctor=${doc.id}`} className="bg-[#212121] hover:bg-white hover:text-black text-[#DEDBC8] px-5 py-2 rounded-full text-sm font-medium transition-colors">
                    Book Visit
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
