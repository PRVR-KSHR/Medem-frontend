import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  Stethoscope, 
  TestTube2, 
  Pill, 
  Video, 
  Building2, 
  Car, 
  Droplet 
} from "lucide-react";

const SERVICES = [
  { id: "emergency", title: "Emergency Care", desc: "150km radius rapid response dispatch.", icon: AlertTriangle, color: "text-red-400" },
  { id: "doctor", title: "Doctor Consultation", desc: "Book OPD visits with specialists.", icon: Stethoscope, color: "text-[#DEDBC8]" },
  { id: "lab-tests", title: "Lab Tests Booking", desc: "Home sample collection and reports.", icon: TestTube2, color: "text-[#DEDBC8]" },
  { id: "medicine", title: "Medicine Delivery", desc: "Generic and branded meds delivered.", icon: Pill, color: "text-[#DEDBC8]" },
  { id: "telemedicine", title: "Telemedicine", desc: "WebRTC video consultations.", icon: Video, color: "text-[#DEDBC8]" },
  { id: "hospitals", title: "Hospitals & Clinics", desc: "Search nearby healthcare centers.", icon: Building2, color: "text-[#DEDBC8]" },
  { id: "ambulance", title: "Ambulance Service", desc: "GPS tracking and live ETA.", icon: Car, color: "text-red-400" },
  { id: "blood-bank", title: "Blood Bank", desc: "Find donors or request blood.", icon: Droplet, color: "text-red-500" },
];

export default function Services() {
  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.10] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            Our Offerings
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#E1E0CC] mb-6">
            Complete Healthcare Solutions
          </h1>
          <p className="text-[#DEDBC8]/70 text-base md:text-lg max-w-2xl">
            MedEm provides a full spectrum of medical services. Whether it's a routine consultation or a critical emergency, we're equipped to handle it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
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
      </div>
    </div>
  );
}
