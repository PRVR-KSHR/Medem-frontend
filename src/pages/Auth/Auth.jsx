import { useState } from "react";
import { Link } from "react-router-dom";

export default function Auth({ type = "login" }) {
  const [isLogin, setIsLogin] = useState(type === "login");
  const [role, setRole] = useState("patient");

  return (
    <div className="flex-1 flex w-full relative min-h-screen bg-black overflow-hidden pt-16">
      <div className="absolute inset-0 bg-noise opacity-[0.10] pointer-events-none" />
      
      <div className="w-full max-w-md mx-auto relative z-10 flex flex-col justify-center px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif italic text-[#E1E0CC] mb-2">
            {isLogin ? "Welcome Back" : "Join MedEm"}
          </h1>
          <p className="text-[#DEDBC8]/60 text-sm">
            {isLogin ? "Enter your credentials to access your account." : "Create an account to access unified healthcare."}
          </p>
        </div>

        <div className="bg-[#101010] p-8 rounded-[2rem] border border-[#DEDBC8]/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          {!isLogin && (
            <div className="flex gap-2 mb-6 p-1 bg-[#1a1a1a] rounded-full border border-[#DEDBC8]/5">
              <button 
                onClick={() => setRole("patient")}
                className={`flex-1 py-2 text-sm rounded-full transition-colors ${role === "patient" ? "bg-[#212121] text-[#E1E0CC] shadow" : "text-[#DEDBC8]/50 hover:text-[#DEDBC8]"}`}
              >
                Patient
              </button>
              <button 
                onClick={() => setRole("doctor")}
                className={`flex-1 py-2 text-sm rounded-full transition-colors ${role === "doctor" ? "bg-[#212121] text-[#E1E0CC] shadow" : "text-[#DEDBC8]/50 hover:text-[#DEDBC8]"}`}
              >
                Doctor
              </button>
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div>
                <label className="block text-[#DEDBC8]/70 text-xs mb-1 ml-1 uppercase tracking-wider">Full Name</label>
                <input type="text" className="w-full bg-[#151515] border border-[#DEDBC8]/20 focus:border-[#DEDBC8]/50 text-[#E1E0CC] rounded-xl px-4 py-3 placeholder:text-[#DEDBC8]/30 outline-none transition-colors" placeholder="John Doe" />
              </div>
            )}
            <div>
              <label className="block text-[#DEDBC8]/70 text-xs mb-1 ml-1 uppercase tracking-wider">Email Address</label>
              <input type="email" className="w-full bg-[#151515] border border-[#DEDBC8]/20 focus:border-[#DEDBC8]/50 text-[#E1E0CC] rounded-xl px-4 py-3 placeholder:text-[#DEDBC8]/30 outline-none transition-colors" placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="block text-[#DEDBC8]/70 text-xs mb-1 ml-1 uppercase tracking-wider">Password</label>
                {isLogin && <a href="#" className="text-[#DEDBC8]/50 text-xs hover:text-white">Forgot?</a>}
              </div>
              <input type="password" className="w-full bg-[#151515] border border-[#DEDBC8]/20 focus:border-[#DEDBC8]/50 text-[#E1E0CC] rounded-xl px-4 py-3 placeholder:text-[#DEDBC8]/30 outline-none transition-colors" placeholder="••••••••" />
            </div>

            <button type="button" className="w-full bg-primary text-black font-medium py-3 rounded-xl mt-6 hover:bg-white transition-colors">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
            
            <div className="text-center mt-6">
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#DEDBC8]/50 text-sm hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
