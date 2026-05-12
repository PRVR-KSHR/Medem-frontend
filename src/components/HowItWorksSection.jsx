import { motion } from "motion/react";
import { Search, CalendarCheck, Stethoscope, ShieldCheck } from "lucide-react";
import medicalAbstract from "../assets/medical_abstract.png";
import modernMedicalTech from "../assets/modern_medical_tech.png";

export default function HowItWorksSection({ t, type = "doctors" }) {
  const steps = [
    {
      id: "step1",
      icon: Search,
      title: t(`howItWorks.${type}.steps.step1.title`),
      desc: t(`howItWorks.${type}.steps.step1.desc`),
    },
    {
      id: "step2",
      icon: CalendarCheck,
      title: t(`howItWorks.${type}.steps.step2.title`),
      desc: t(`howItWorks.${type}.steps.step2.desc`),
    },
    {
      id: "step3",
      icon: Stethoscope,
      title: t(`howItWorks.${type}.steps.step3.title`),
      desc: t(`howItWorks.${type}.steps.step3.desc`),
    },
    {
      id: "step4",
      icon: ShieldCheck,
      title: t(`howItWorks.${type}.steps.step4.title`),
      desc: t(`howItWorks.${type}.steps.step4.desc`),
    },
  ];

  return (
    <section className="bg-black py-24 px-4 md:px-6 w-full relative overflow-hidden border-t border-[#DEDBC8]/10">
      {/* Background styling */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url(${medicalAbstract})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Left column: Sticky Image */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-[400px] lg:h-[600px] w-full rounded-[2.5rem] overflow-hidden relative border border-[#DEDBC8]/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
          <img 
            src={modernMedicalTech} 
            alt="Modern Medical Technology" 
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />
          
          <div className="absolute bottom-8 left-8 right-8">
             <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <p className="text-[#E1E0CC] text-xl font-medium tracking-tight mb-2 drop-shadow-md">
                   Next-Generation Care
                </p>
                <p className="text-[#DEDBC8]/70 text-sm">
                   Combining clinical expertise with advanced digital infrastructure.
                </p>
             </div>
          </div>
        </div>

        {/* Right column: Steps Content */}
        <div className="lg:col-span-7 lg:pl-10 xl:pl-16 flex flex-col justify-center">
          <div className="mb-14">
            <span className="text-primary text-[10px] sm:text-xs tracking-[0.22em] uppercase mb-4 block">
              {t(`howItWorks.${type}.kicker`)}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#E1E0CC] leading-tight mb-6 drop-shadow-lg">
              {t(`howItWorks.${type}.title`)}
            </h2>
            <p className="text-[#DEDBC8]/65 text-base md:text-lg max-w-xl leading-relaxed">
              {t(`howItWorks.${type}.subtitle`)}
            </p>
          </div>

          <div className="flex flex-col gap-6 relative">
            {/* Connecting vertical line */}
            <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#dc2626]/40 via-[#dc2626]/10 to-transparent hidden sm:block" />

            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex gap-6 sm:gap-8 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#101010] border border-[#dc2626]/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.1)] group-hover:border-[#dc2626]/60 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] transition-all relative z-10">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 bg-[#101010]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 group-hover:bg-[#151515]/80 group-hover:border-white/10 transition-colors">
                  <h3 className="text-[#E1E0CC] text-xl font-medium mb-3 tracking-tight group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#DEDBC8]/60 text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
