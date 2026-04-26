import { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Clock4, Send, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL || "http://localhost:5000", []);

  function validateContact({ name, email, message }) {
    const nextErrors = {};
    if (!name || name.trim().length < 2) nextErrors.name = t("contact.validation.name");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = t("contact.validation.email");
    if (!message || message.trim().length < 10) nextErrors.message = t("contact.validation.message");
    return nextErrors;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContact(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitState({ status: "loading", message: "" });
    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await response.json();
      if (!response.ok) {
        const fields = result?.error?.fields || [];
        const fieldMap = {};
        for (const field of fields) fieldMap[field.field] = field.message;
        setErrors(fieldMap);
        setSubmitState({ status: "error", message: t("contact.error") });
        return;
      }

      setSubmitState({ status: "success", message: t("contact.success") });
      setErrors({});
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSubmitState({ status: "error", message: t("contact.networkError") });
    }
  }

  return (
    <div className="w-full flex-1 bg-black pt-24 pb-20 px-4 md:px-6">
      <section className="max-w-7xl mx-auto mb-10">
        <p className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4">{t("contactPage.kicker")}</p>
        <h1 className="text-3xl md:text-5xl font-serif italic text-[#E1E0CC] mb-4 max-w-3xl leading-tight">
          {t("contactPage.title")}
        </h1>
        <p className="text-[#DEDBC8]/65 max-w-3xl text-sm md:text-base leading-relaxed">{t("contactPage.subtitle")}</p>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <aside className="lg:col-span-5 bg-[#101010] border border-[#DEDBC8]/10 rounded-[1.8rem] p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <h2 className="text-2xl font-serif italic text-[#E1E0CC] mb-2">{t("contactPage.detailsTitle")}</h2>
          <p className="text-[#DEDBC8]/60 text-sm mb-8">{t("contactPage.detailsSubtitle")}</p>

          <div className="space-y-4">
            <InfoCard icon={Phone} title={t("contactPage.phoneTitle")} value={t("contact.phone")} />
            <InfoCard icon={Mail} title={t("contactPage.emailTitle")} value={t("contact.email")} />
            <InfoCard icon={MapPin} title={t("contactPage.addressTitle")} value={t("contact.address")} />
            <InfoCard icon={Clock4} title={t("contactPage.hoursTitle")} value={t("contactPage.hoursValue")} />
            <InfoCard icon={Building2} title={t("contactPage.officeTitle")} value={t("contactPage.officeValue")} />
          </div>
        </aside>

        <div className="lg:col-span-7 bg-[#0c0c0c] border border-[#DEDBC8]/10 rounded-[1.8rem] p-7 sm:p-10 shadow-[0_24px_55px_rgba(0,0,0,0.52)]">
          <h2 className="text-2xl md:text-3xl font-serif italic text-[#E1E0CC] mb-3">{t("home.contact.title")}</h2>
          <p className="text-[#DEDBC8]/60 text-sm mb-8">{t("home.contact.subtitle")}</p>

          <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-[#DEDBC8] text-sm tracking-wide">{t("contact.fullName")}</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="bg-[#151515] border border-[#DEDBC8]/20 focus:border-primary text-white rounded-lg px-4 py-3 outline-none transition-colors"
                  placeholder={t("contact.yourName")}
                />
                {errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[#DEDBC8] text-sm tracking-wide">{t("contact.email_label")}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="bg-[#151515] border border-[#DEDBC8]/20 focus:border-primary text-white rounded-lg px-4 py-3 outline-none transition-colors"
                  placeholder={t("contact.email")}
                />
                {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-[#DEDBC8] text-sm tracking-wide">{t("contact.message")}</span>
              <textarea
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                rows="6"
                className="bg-[#151515] border border-[#DEDBC8]/20 focus:border-primary text-white rounded-lg px-4 py-3 outline-none transition-colors resize-none"
                placeholder={t("contact.howCanWeHelp")}
              />
              {errors.message && <span className="text-red-400 text-xs">{errors.message}</span>}
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                disabled={submitState.status === "loading"}
                className="inline-flex items-center gap-2 bg-primary text-black font-medium px-7 py-3 rounded-full hover:bg-white transition-colors"
              >
                {submitState.status === "loading" ? t("contact.sending") : t("contact.send")}
                <Send className="w-4 h-4" />
              </button>

              {submitState.message && (
                <span className={`text-sm ${submitState.status === "error" ? "text-red-400" : "text-green-400"}`}>
                  {submitState.message}
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, title, value }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#DEDBC8]/10 bg-[#151515] p-4">
      <div className="w-10 h-10 shrink-0 rounded-xl border border-[#DEDBC8]/20 bg-black flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h3 className="text-[#DEDBC8] text-sm font-medium">{title}</h3>
        <p className="text-[#DEDBC8]/65 text-sm leading-relaxed mt-1">{value}</p>
      </div>
    </div>
  );
}
