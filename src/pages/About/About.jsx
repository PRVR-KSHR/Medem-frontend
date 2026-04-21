import { motion } from "motion/react";
import { Activity, ShieldCheck, HeartPulse, Globe } from "lucide-react";

export default function About() {
  const VALUES = [
    { title: "Rapid Response", desc: "Every second counts in emergencies. Our systems are optimized for instant dispatch.", icon: Activity },
    { title: "Verified Professionals", desc: "We only partner with top-tier, licensed medical experts and certified hospitals.", icon: ShieldCheck },
    { title: "Patient First", desc: "Your health, privacy, and well-being are the core of every decision we make.", icon: HeartPulse },
    { title: "Universal Access", desc: "Breaking down geographical barriers to bring high-quality healthcare anywhere.", icon: Globe },
  ];

  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.10] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-24">
        {/* Hero Section */}
        <div className="text-center md:text-left">
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#E1E0CC] mb-8">
            Redefining access to critical healthcare.
          </h1>
          <p className="text-[#DEDBC8]/70 text-base md:text-lg leading-relaxed max-w-3xl">
            MedEm was founded on a simple but powerful premise: no one should have to wait for life-saving medical attention. By bridging the gap between advanced technology and highly vetted medical professionals, we have built a seamless ecosystem that dispatches ambulances, connects patients with doctors, and delivers essential medicines, all within minutes.
          </p>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif italic text-[#E1E0CC] border-b border-[#DEDBC8]/10 pb-4 inline-block pr-12">
              Our Core Values
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
                className="bg-[#101010] border border-[#DEDBC8]/10 rounded-2xl p-8 hover:border-[#DEDBC8]/30 transition-colors"
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
        <div className="bg-[#101010] rounded-[2rem] p-8 md:p-16 border border-[#DEDBC8]/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl md:text-4xl font-serif italic text-[#E1E0CC] max-w-2xl mx-auto leading-relaxed relative z-10">
            "To become the universal connective tissue of modern healthcare, ensuring that distance is never the barrier to survival."
          </h2>
        </div>
      </div>
    </div>
  );
}
