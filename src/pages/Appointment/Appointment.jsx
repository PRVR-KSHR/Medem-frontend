import { useState } from "react";
import { CheckCircle2, ChevronRight, Calendar, User, CreditCard } from "lucide-react";

export default function Appointment() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-serif italic text-[#E1E0CC] mb-8 text-center">
          Book Appointment
        </h1>

        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[#DEDBC8]/10 -z-10" />
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? "bg-[#DEDBC8] text-black" : "bg-[#212121] text-[#DEDBC8]/50 border border-[#DEDBC8]/20"}`}>
              {s}
            </div>
          ))}
        </div>

        <div className="bg-[#101010] border border-[#DEDBC8]/10 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          {step === 1 && (
            <div className="space-y-6 flex flex-col">
              <h2 className="text-xl text-[#E1E0CC] font-medium flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Select Doctor
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div onClick={() => setStep(2)} className="border border-[#DEDBC8]/20 hover:border-primary p-4 rounded-xl cursor-pointer transition-colors bg-[#151515]">
                  <h3 className="text-[#E1E0CC] font-medium">Dr. Marcus Chen</h3>
                  <p className="text-[#DEDBC8]/60 text-sm">Cardiologist</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 flex flex-col">
              <h2 className="text-xl text-[#E1E0CC] font-medium flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Date & Time
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {["09:00 AM", "10:30 AM", "02:00 PM"].map((time, i) => (
                  <div key={i} onClick={() => setStep(3)} className="border border-[#DEDBC8]/20 hover:border-primary p-3 rounded-xl cursor-pointer transition-colors bg-[#151515] text-center text-sm text-[#E1E0CC]">
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 flex flex-col">
              <h2 className="text-xl text-[#E1E0CC] font-medium flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Payment
              </h2>
              <div className="bg-[#151515] p-4 rounded-xl border border-[#DEDBC8]/10 text-[#E1E0CC]">
                <div className="flex justify-between mb-2">
                  <span>Consultation Fee</span>
                  <span>$150.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-[#DEDBC8]/10">
                  <span>Total</span>
                  <span>$150.00</span>
                </div>
              </div>
              <button onClick={() => setStep(4)} className="bg-primary text-black w-full py-4 rounded-full font-medium mt-4 hover:bg-white transition-colors">
                Pay Securely
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl text-[#E1E0CC] font-medium mb-2">Booking Confirmed!</h2>
              <p className="text-[#DEDBC8]/60 mb-8 max-w-sm mx-auto">Your appointment with Dr. Marcus Chen is scheduled for Tomorrow at 10:30 AM.</p>
            </div>
          )}

          {step > 1 && step < 4 && (
            <button onClick={() => setStep(step - 1)} className="mt-8 text-sm text-[#DEDBC8]/50 hover:text-white transition-colors">
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
