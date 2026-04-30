import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emergencyBg from "../../assets/Service-bg/Emergency.png";
import doctorBg from "../../assets/Service-bg/Doctor.png";
import labBg from "../../assets/Service-bg/lab.png";
import medicineBg from "../../assets/Service-bg/medicine.png";
import telemedicineBg from "../../assets/Service-bg/Telemedcine.png";
import hospitalsBg from "../../assets/Service-bg/Hospital & clinic.png";
import ambulanceBg from "../../assets/Service-bg/Ambulance Service.png";
import bloodBankBg from "../../assets/Service-bg/Blood bank.png";
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

export default function Services() {
  const { t } = useTranslation();

  const SERVICES = [
    { id: "emergency", title: t('services.emergency'), desc: t('services.emergencyDesc'), icon: AlertTriangle, color: "text-red-400", bg: emergencyBg },
    { id: "doctor", title: t('services.opd'), desc: t('services.opdDesc'), icon: Stethoscope, color: "text-[#DEDBC8]", bg: doctorBg },
    { id: "lab-tests", title: t('services.labTests'), desc: t('services.labTestsDesc'), icon: TestTube2, color: "text-[#DEDBC8]", bg: labBg },
    { id: "medicine", title: t('services.medicine'), desc: t('services.medicineDesc'), icon: Pill, color: "text-[#DEDBC8]", bg: medicineBg },
    { id: "telemedicine", title: t('services.telemedicine'), desc: t('services.telemedicineDesc'), icon: Video, color: "text-[#DEDBC8]", bg: telemedicineBg },
    { id: "hospitals", title: t('services.hospitals'), desc: t('services.hospitalsDesc'), icon: Building2, color: "text-[#DEDBC8]", bg: hospitalsBg },
    { id: "ambulance", title: t('services.ambulance'), desc: t('services.ambulanceDesc'), icon: Car, color: "text-red-400", bg: ambulanceBg },
    { id: "blood-bank", title: t('services.bloodBank'), desc: t('services.bloodBankDesc'), icon: Droplet, color: "text-red-500", bg: bloodBankBg },
  ];

  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.10] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            {t('servicesPage.kicker')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#E1E0CC] mb-6">
            {t('servicesPage.title')}
          </h1>
          <p className="text-[#DEDBC8]/70 text-base md:text-lg max-w-2xl">
            {t('servicesPage.subtitle')}
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
                className="relative block h-full overflow-hidden rounded-2xl p-8 border border-[#dc2626]/25 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(220,38,38,0.12)] transition-all group"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(6, 8, 13, 0.96) 0%, rgba(6, 8, 13, 0.84) 58%, rgba(6, 8, 13, 0.38) 100%), url(${service.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "right center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 backdrop-blur-[1.5px] opacity-70 pointer-events-none" />
                <div className="relative z-10 bg-[#212121]/80 w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-[#dc2626]/25 group-hover:scale-110 transition-transform">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="relative z-10 text-[#E1E0CC] text-xl font-medium mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{service.title}</h3>
                <p className="relative z-10 text-[#DEDBC8]/75 text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
