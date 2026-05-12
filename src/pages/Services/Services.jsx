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
import servicesHeroBg from "../../assets/services_hero_bg.png";
import HowItWorksSection from "../../components/HowItWorksSection.jsx";

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
    <div className="w-full flex-1 bg-black relative">
      {/* Sticky Background — stays fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${servicesHeroBg})` }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Hero Text Area */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            {t('servicesPage.kicker')}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#E1E0CC] mb-6 drop-shadow-lg max-w-4xl mx-auto">
            {t('servicesPage.title')}
          </h1>
          <p className="text-[#DEDBC8]/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            {t('servicesPage.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 pb-32 pt-20 px-4 sm:px-6 lg:px-8">
        {/* Faded Background for the services section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/services/${service.id}`}
                  className="relative block h-full overflow-hidden rounded-2xl p-8 border border-[#dc2626]/25 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(220,38,38,0.12)] transition-all duration-500 group hover:border-[#dc2626]/50 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(220,38,38,0.15)]"
                >
                  <div 
                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${service.bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div 
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                    style={{
                      background: 'linear-gradient(90deg, rgba(6, 8, 13, 0.98) 0%, rgba(6, 8, 13, 0.88) 50%, rgba(6, 8, 13, 0.45) 100%)'
                    }}
                  />
                  <div className="absolute inset-0 backdrop-blur-[1px] opacity-70 pointer-events-none" />
                  
                  <div className="relative z-10 bg-[#212121]/80 w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-[#dc2626]/25 group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#dc2626]/10">
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <h3 className="relative z-10 text-[#E1E0CC] text-xl font-medium mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{service.title}</h3>
                  <p className="relative z-10 text-[#DEDBC8]/75 text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">{service.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <HowItWorksSection t={t} type="services" />
    </div>
  );
}
