import { AlertTriangle, MapPin, PhoneCall, HeartPulse, Activity } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Emergency() {
  const { t } = useTranslation();
  const [detecting, setDetecting] = useState(false);
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([
    { name: t('emergencyPage.hospitals.cityGeneral'), dist: "1.2 km", time: "5", est: "8" },
    { name: t('emergencyPage.hospitals.metroHeart'), dist: "3.5 km", time: "12", est: "15" },
    { name: t('emergencyPage.hospitals.apexTrauma'), dist: "5.1 km", time: "18", est: "22" }
  ]);

  useEffect(() => {
    // Preserve old automatic geolocation functionality
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(t('emergencyPage.geoCoordinates', { lat: pos.coords.latitude.toFixed(2), lon: pos.coords.longitude.toFixed(2) }));
      });
    }
  }, [t]);

  const handleLocate = () => {
    setDetecting(true);
    // Simulate GPS detection resolution
    setTimeout(() => {
      setLocation(t('emergencyPage.sampleLocation'));
      setDetecting(false);
    }, 1500);
  };

  return (
    <div className="w-full flex-1 bg-[#100505] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.20] pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse"
        >
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center border border-red-400">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6">
          {t('emergencyPage.title')}
        </h1>
        <p className="text-red-200/80 text-lg max-w-2xl mb-12">
          {t('emergencyPage.subtitle')}
        </p>

        <button className="bg-red-600 hover:bg-red-500 text-white w-full sm:w-auto text-xl md:text-2xl font-bold py-6 px-12 rounded-[2rem] flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-transform hover:scale-105 active:scale-95 mb-8">
          <PhoneCall className="w-8 h-8" />
          {t('emergencyPage.dispatch')}
        </button>

        <div className="w-full bg-[#150a0a] border border-red-500/20 rounded-[2rem] p-8 mt-8 text-left shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#E1E0CC] text-xl md:text-2xl font-medium flex items-center gap-3">
              <MapPin className="text-red-400" />
              {t('emergencyPage.nearestCare')}
            </h2>
            <button 
              onClick={handleLocate}
              disabled={detecting}
              className="text-sm bg-red-950/40 text-red-300 px-4 py-2 rounded-full hover:bg-red-900/40 transition-colors disabled:opacity-50"
            >
              {detecting ? t('emergencyPage.locating') : location ? t('emergencyPage.refreshLocation') : t('emergencyPage.detectLocation')}
            </button>
          </div>

          {location && (
            <div className="mb-6 p-4 bg-red-950/20 rounded-xl text-red-200/80 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-400" />
              {t('emergencyPage.currentLocation')}: <span className="text-white font-medium">{location}</span>
            </div>
          )}

          <div className="space-y-4">
            {hospitals.map((hosp, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#1a0c0c] border border-red-500/10 rounded-xl hover:border-red-500/30 transition-colors">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-white font-medium text-lg mb-1">{hosp.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-red-200/60">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t('emergencyPage.away', { distance: hosp.dist })}</span>
                    <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {t('emergencyPage.drive', { time: hosp.time })}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span className="text-red-400 text-sm font-medium flex items-center gap-2">
                    <HeartPulse className="w-4 h-4" /> {t('emergencyPage.ambulanceEta', { minutes: hosp.est })}
                  </span>
                  <button className="text-xs border border-red-500/30 text-red-300 px-4 py-1.5 rounded-full hover:bg-red-500/10 transition-colors">
                    {t('emergencyPage.navigate')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Car(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>;
}
