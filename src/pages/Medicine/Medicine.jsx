import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Clock3, MapPin, Pill, ShieldCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Medicine() {
  const { t } = useTranslation();

  const CATEGORIES = [
    {
      title: t('medicinePage.categories.dailyPrescription.title'),
      eta: "90-120 min",
      detail: t('medicinePage.categories.dailyPrescription.detail')
    },
    {
      title: t('medicinePage.categories.acuteCare.title'),
      eta: "45-75 min",
      detail: t('medicinePage.categories.acuteCare.detail')
    },
    {
      title: t('medicinePage.categories.wellness.title'),
      eta: "60-120 min",
      detail: t('medicinePage.categories.wellness.detail')
    }
  ];

  const DELIVERY_FLOW = [
    {
      title: t('medicinePage.flow.uploadPrescription.title'),
      desc: t('medicinePage.flow.uploadPrescription.desc'),
      icon: ShieldCheck
    },
    {
      title: t('medicinePage.flow.pharmacistReview.title'),
      desc: t('medicinePage.flow.pharmacistReview.desc'),
      icon: Pill
    },
    {
      title: t('medicinePage.flow.dispatchNearby.title'),
      desc: t('medicinePage.flow.dispatchNearby.desc'),
      icon: MapPin
    },
    {
      title: t('medicinePage.flow.trackedDelivery.title'),
      desc: t('medicinePage.flow.trackedDelivery.desc'),
      icon: Truck
    }
  ];

  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14"
        >
          <div className="lg:col-span-8">
            <span className="text-red-400 text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">{t('medicinePage.kicker')}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#E1E0CC] leading-[1.05] mb-5">
              {t('medicinePage.titleLine1')} <br /> {t('medicinePage.titleLine2')}
            </h1>
            <p className="text-[#DEDBC8]/70 text-base md:text-lg max-w-2xl">
              {t('medicinePage.subtitle')}
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#101010] border border-[#DEDBC8]/15 rounded-2xl p-6 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-5 h-5 text-red-400" />
              <p className="text-[#E1E0CC] text-sm font-medium">{t('medicinePage.expressDelivery')}</p>
            </div>
            <p className="text-[#DEDBC8]/70 text-sm leading-relaxed mb-4">{t('medicinePage.expressDeliveryDesc')}</p>
            <div className="flex items-center gap-2 text-xs text-[#DEDBC8]/70">
              <Clock3 className="w-4 h-4 text-red-400" />
              {t('medicinePage.typicalEta')}
            </div>
          </div>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {CATEGORIES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="bg-[#101010] hover:bg-[#151515] border border-[#DEDBC8]/10 rounded-2xl p-6 transition-colors"
            >
              <h2 className="text-[#E1E0CC] text-xl mb-3">{item.title}</h2>
              <div className="space-y-2 text-sm text-[#DEDBC8]/70">
                <p>{item.detail}</p>
                <p>ETA: {item.eta}</p>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-serif text-[#E1E0CC] mb-6">{t('medicinePage.orderFlow')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DELIVERY_FLOW.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="bg-[#0d0d0d] border border-[#DEDBC8]/10 rounded-2xl p-5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#DEDBC8]/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-[#E1E0CC] mb-2">{step.title}</h3>
                <p className="text-[#DEDBC8]/65 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-[#101010] border border-[#DEDBC8]/10 rounded-3xl p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-serif text-[#E1E0CC] mb-2">{t('medicinePage.reminderTitle')}</h2>
            <p className="text-[#DEDBC8]/70 text-sm md:text-base">{t('medicinePage.reminderSubtitle')}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/appointment" className="inline-flex items-center gap-2 bg-red-500 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-red-600 transition-colors">
              {t('medicinePage.orderMedicines')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 border border-[#DEDBC8]/30 text-[#DEDBC8] rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#DEDBC8]/10 transition-colors">
              {t('medicinePage.exploreMore')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
