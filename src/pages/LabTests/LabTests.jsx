import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Clock3, FileText, House, ShieldCheck, TestTube2 } from "lucide-react";

const LAB_PACKAGES = [
  {
    name: "Essential Health Screen",
    turnaround: "24 hrs",
    tests: "45 parameters",
    price: "Starting at Rs. 799"
  },
  {
    name: "Cardiac Risk Panel",
    turnaround: "24-36 hrs",
    tests: "28 parameters",
    price: "Starting at Rs. 1299"
  },
  {
    name: "Diabetes & Thyroid Panel",
    turnaround: "24 hrs",
    tests: "22 parameters",
    price: "Starting at Rs. 999"
  }
];

const LAB_STEPS = [
  {
    title: "Choose Package",
    desc: "Select a test package and preferred home collection time slot.",
    icon: CalendarDays
  },
  {
    title: "Sample Collection",
    desc: "Certified phlebotomist reaches your location with sterile kits.",
    icon: House
  },
  {
    title: "Lab Processing",
    desc: "NABL-standard processing with strict quality controls.",
    icon: ShieldCheck
  },
  {
    title: "Digital Reports",
    desc: "Get verified reports in app and on email with doctor-ready format.",
    icon: FileText
  }
];

export default function LabTests() {
  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#DEDBC8]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14"
        >
          <div className="lg:col-span-8">
            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">Lab Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#E1E0CC] leading-[1.05] mb-5">
              At-home lab tests, <br /> faster reports, calmer mornings.
            </h1>
            <p className="text-[#DEDBC8]/70 text-base md:text-lg max-w-2xl">
              Book diagnostics in minutes with doorstep sample collection, transparent pricing, and clinically verified reports.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#101010] border border-[#DEDBC8]/15 rounded-2xl p-6 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3 mb-3">
              <TestTube2 className="w-5 h-5 text-primary" />
              <p className="text-[#E1E0CC] text-sm font-medium">Home Collection Window</p>
            </div>
            <p className="text-[#DEDBC8]/70 text-sm leading-relaxed mb-4">6:30 AM to 9:30 PM in major cities. Real-time collector ETA shared before arrival.</p>
            <div className="flex items-center gap-2 text-xs text-[#DEDBC8]/70">
              <Clock3 className="w-4 h-4 text-primary" />
              Average report delivery: 24 hours
            </div>
          </div>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {LAB_PACKAGES.map((pack, index) => (
            <motion.article
              key={pack.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="bg-[#101010] hover:bg-[#151515] border border-[#DEDBC8]/10 rounded-2xl p-6 transition-colors"
            >
              <h2 className="text-[#E1E0CC] text-xl mb-3">{pack.name}</h2>
              <div className="space-y-2 text-sm text-[#DEDBC8]/70">
                <p>{pack.tests}</p>
                <p>Report in {pack.turnaround}</p>
                <p className="text-primary">{pack.price}</p>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-serif italic text-[#E1E0CC] mb-6">How it works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LAB_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="bg-[#0d0d0d] border border-[#DEDBC8]/10 rounded-2xl p-5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#DEDBC8]/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-[#E1E0CC] mb-2">{step.title}</h3>
                <p className="text-[#DEDBC8]/65 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-[#101010] border border-[#DEDBC8]/10 rounded-3xl p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-serif italic text-[#E1E0CC] mb-2">Need urgent testing today?</h2>
            <p className="text-[#DEDBC8]/70 text-sm md:text-base">Same-day collection available for priority tests in selected locations.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/appointment" className="inline-flex items-center gap-2 bg-[#DEDBC8] text-black rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white transition-colors">
              Book Lab Visit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 border border-[#DEDBC8]/30 text-[#DEDBC8] rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#DEDBC8]/10 transition-colors">
              Explore More Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
