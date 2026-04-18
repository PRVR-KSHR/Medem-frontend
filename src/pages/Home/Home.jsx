import FadeIn from '../../components/FadeIn/FadeIn.jsx'
import Button from '../../components/Button/Button.jsx'
import styles from './Home.module.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import doctorHero from '../../assets/doctor-1.png'
import googlePlayBadge from '../../assets/google_play.png'
import appStoreBadge from '../../assets/app_store.png'
import doctor1 from '../../assets/doctor-1.svg'
import doctor2 from '../../assets/doctor-2.svg'
import doctor3 from '../../assets/doctor-3.svg'
import map from '../../assets/map.svg'
import partner1 from '../../assets/partners/partner_1.png'
import partner2 from '../../assets/partners/partner_2.png'
import partner3 from '../../assets/partners/partner_3.png'
import partner4 from '../../assets/partners/partner_4.png'
import partner5 from '../../assets/partners/partner_5.png'
import partner6 from '../../assets/partners/partner_6.png'
import partner7 from '../../assets/partners/partner_7.png'
import partner8 from '../../assets/partners/partner_8.png'
import partner9 from '../../assets/partners/partner_9.png'
import partner10 from '../../assets/partners/partner_10.png'

const partners = [
  { src: partner1, alt: 'Partner 1', height: '120px' },
  { src: partner2, alt: 'Partner 2', height: '110px' },
  { src: partner3, alt: 'Partner 3', height: '80px' },
  { src: partner4, alt: 'Partner 4', height: '60px' },
  { src: partner5, alt: 'Partner 5', height: '60px' },
  { src: partner6, alt: 'Partner 6', height: '110px' },
  { src: partner7, alt: 'Partner 7', height: '52px' },
  { src: partner8, alt: 'Partner 8', height: '100px' },
  { src: partner9, alt: 'Partner 9', height: '100px' },
  { src: partner10, alt: 'Partner 10', height: '50px' }
]

function getServices(t) {
  return [
    {
      titleKey: 'emergency',
      descKey: 'emergencyDesc',
      icon: '🚨',
      requiresAuth: false,
      action: 'emergency'
    },
    {
      titleKey: 'opd',
      descKey: 'opdDesc',
      icon: '👨‍⚕️',
      requiresAuth: true,
      action: 'opd'
    },
    {
      titleKey: 'labTests',
      descKey: 'labTestsDesc',
      icon: '🧬',
      requiresAuth: true,
      action: 'lab-tests'
    },
    {
      titleKey: 'medicine',
      descKey: 'medicineDesc',
      icon: '💊',
      requiresAuth: true,
      action: 'medicine'
    },
    {
      titleKey: 'telemedicine',
      descKey: 'telemedicineDesc',
      icon: '📱',
      requiresAuth: true,
      action: 'telemedicine'
    },
    {
      titleKey: 'hospitals',
      descKey: 'hospitalsDesc',
      icon: '🏥',
      requiresAuth: true,
      action: 'hospitals'
    },
    {
      titleKey: 'ambulance',
      descKey: 'ambulanceDesc',
      icon: '🚑',
      requiresAuth: false,
      action: 'ambulance'
    },
    {
      titleKey: 'bloodBank',
      descKey: 'bloodBankDesc',
      icon: '🩸',
      requiresAuth: false,
      action: 'blood-bank'
    },
    {
      titleKey: 'healthRecords',
      descKey: 'healthRecordsDesc',
      icon: '📋',
      requiresAuth: true,
      action: 'health-records'
    }
  ]
}

function isIndicHeroLang(lang) {
  return typeof lang === 'string' && (lang.startsWith('hi') || lang.startsWith('bn'))
}

const doctors = [
  { name: 'Dr. Sophia Patel', specialty: 'Orthopedic Surgeon', img: doctor1 },
  { name: 'Dr. James Anderson', specialty: 'Cardiologist', img: doctor2 },
  { name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', img: doctor3 }
]

const testimonialTotal = 200
const testimonials = [
  {
    name: 'Jidan',
    text:
      'I recently visited Shifa, and I am beyond impressed with the level of care and convenience they offer. The website is user-friendly, and booking an appointment was seamless. I was able to schedule a consultation with Dr. James Anderson, the cardiologist, and the entire experience was top-notch.'
  },
  {
    name: 'Aaliyah',
    text:
      'From check-in to follow-up, everything felt thoughtful and professional. The team was responsive, and the guidance I received made a real difference.'
  },
  {
    name: 'Noah',
    text:
      'Booking was quick, the staff was kind, and the consultation felt thorough. I appreciated the clarity and the calm atmosphere.'
  }
]

function Field({ label, id, error, ...props }) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.fieldLabel}>{label}</span>
      <input id={id} className={`${styles.input} ${error ? styles.inputError : ''}`} {...props} />
      {error ? <span className={styles.fieldError}>{error}</span> : null}
    </label>
  )
}

function TextArea({ label, id, error, ...props }) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.fieldLabel}>{label}</span>
      <textarea id={id} className={`${styles.textarea} ${error ? styles.inputError : ''}`} {...props} />
      {error ? <span className={styles.fieldError}>{error}</span> : null}
    </label>
  )
}

function validateContact({ name, email, message }, t) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = t('contact.validation.name') || 'Please enter your name.'
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = t('contact.validation.email') || 'Please enter a valid email address.'
  if (!message || message.trim().length < 10) errors.message = t('contact.validation.message') || 'Please enter a message (min 10 characters).'
  return errors
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const indicHero = isIndicHeroLang(i18n.language)
  const partnerViewportRef = useRef(null)
  const partnerRowRef = useRef(null)
  const { showEmergency, setShowEmergency } = useOutletContext()
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [nearbyHospitals, setNearbyHospitals] = useState([])
  const [tIndex, setTIndex] = useState(0)
  const currentTestimonial = testimonials[tIndex]

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' })

  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5000', [])
  const services = useMemo(() => getServices(t), [t])

  const onEmergencyClick = () => {
    setShowEmergency(true)
  }

  useEffect(() => {
    // CSS animation handles the continuous marquee loop
  }, [])

  useEffect(() => {
    // Get nearby hospitals based on geolocation
    if (showEmergency && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords
        // Mock nearby hospitals within 25km
        setNearbyHospitals([
          { name: 'City General Hospital', distance: '5.2 km', phone: '+91-98765-43210' },
          { name: 'Rural Medical Center', distance: '8.7 km', phone: '+91-98765-43211' },
          { name: 'Government Hospital', distance: '12.3 km', phone: '+91-98765-43212' },
          { name: 'District Medical College', distance: '18.9 km', phone: '+91-98765-43213' },
          { name: 'Tehsil Hospital', distance: '22.1 km', phone: '+91-98765-43214' }
        ])
      })
    }
  }, [showEmergency])

  function handleServiceClick(service) {
    if (service.action === 'emergency') {
      setShowEmergency(true)
      return
    }
    
    if (service.requiresAuth && !isLoggedIn) {
      // Redirect to login/signup
      alert('Please login first to access ' + service.title)
      return
    }
    
    // Navigate to service details
    alert('Service: ' + service.title + ' (Detailed page coming soon)')
  }

  function handleEmergencyCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`
  }

  async function onSubmit(e) {
    e.preventDefault()

    const nextErrors = validateContact(form, t)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSubmitState({ status: 'loading', message: '' })

    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const json = await res.json()

      if (!res.ok) {
        const fields = json?.error?.fields || []
        const fieldMap = {}
        for (const f of fields) fieldMap[f.field] = f.message
        setErrors(fieldMap)
        setSubmitState({ status: 'error', message: 'Please fix the highlighted fields.' })
        return
      }

      setSubmitState({ status: 'success', message: 'Message sent successfully.' })
      setForm({ name: '', email: '', message: '' })
      setErrors({})
    } catch {
      setSubmitState({ status: 'error', message: 'Could not send message. Please try again.' })
    }
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section id="home" className={styles.heroWrap} aria-label="Hero">
        <div className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <FadeIn
                as="h1"
                className={`${styles.heroTitle} ${indicHero ? styles.heroTitleIndic : ''}`}
              >
                {t('hero.title')}
              </FadeIn>

              <FadeIn>
                <p className={styles.heroText}>
                  {t('hero.description')}
                </p>
              </FadeIn>

              <FadeIn>
                <div className={styles.heroCtas}>
                  <Button variant="primary" size="lg" as="a" href="#contact">
                    {t('hero.bookAppointment')}
                  </Button>
                  <button 
                    className={styles.emergencyBtn}
                    type="button"
                    onClick={onEmergencyClick}
                    title="Emergency Help"
                  >
                    <span className={styles.emergencyIcon} aria-hidden="true">
                      <DotLottieReact
                        src="https://lottie.host/351c98c3-375b-4643-a643-4308c0bdc563/WQlrkeq7qB.lottie"
                        loop
                        autoplay
                        style={{ width: 50, height: 40 }}
                      />
                    </span>
                    <span className={styles.emergencyLabel}>{t('hero.emergency')}</span>
                  </button>
                </div>
              </FadeIn>

              <FadeIn>
                <div className={styles.storeBadges} aria-label={t('hero.downloadApp')}>
                  <button
                    className={`${styles.storeBadge} ${styles.googlePlayBadge}`}
                    type="button"
                    aria-disabled="true"
                    onClick={(e) => e.preventDefault()}
                    title={t('hero.comingSoon')}
                  >
                    <img
                      className={styles.storeBadgeImg}
                      src={googlePlayBadge}
                      alt="Get it on Google Play"
                      loading="lazy"
                      draggable="false"
                    />
                    <span className={styles.badgeSoon}>{t('hero.comingSoon')}</span>
                  </button>

                  <button
                    className={`${styles.storeBadge} ${styles.appStoreBadge}`}
                    type="button"
                    aria-disabled="true"
                    onClick={(e) => e.preventDefault()}
                    title={t('hero.comingSoon')}
                  >
                    <img
                      className={styles.storeBadgeImg}
                      src={appStoreBadge}
                      alt="Download on the App Store"
                      loading="lazy"
                      draggable="false"
                    />
                    <span className={styles.badgeSoon}>{t('hero.comingSoon')}</span>
                  </button>
                </div>
              </FadeIn>
            </div>

            <div className={styles.heroRight}>
              <FadeIn>
                <img className={styles.doctor} src={doctorHero} alt="Doctor" loading="lazy" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className={styles.partners} aria-label="Trusted partners">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.partnersTitle}>{t('partners.title')}</div>
          </FadeIn>
          <FadeIn>
            <div className={styles.partnerViewport} ref={partnerViewportRef}>
              <div className={styles.partnerRow} ref={partnerRowRef}>
                {partners.map((p) => (
                  <img
                    key={p.alt}
                    className={styles.partnerLogo}
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    style={{ height: p.height }}
                  />
                ))}
                {partners.map((p) => (
                  <img
                    key={`${p.alt}-2`}
                    className={styles.partnerLogo}
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    style={{ height: p.height }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={styles.about} aria-label="About">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.aboutCard}>
              <p className={styles.aboutLead}>
                {t('about.welcome')}
              </p>
              <p className={styles.aboutLead}>
                Our team of experienced doctors is committed to{' '}
                <span className={styles.underlined}>{t('about.commitment')}</span>
              </p>

              <div className={styles.statsGrid}>
                <div className={styles.statCardWide}>
                  <div className={styles.statOverlay}>
                    <div className={styles.statBig}>30%</div>
                    <div className={styles.statSmall}>{t('about.stats.savings')}</div>
                  </div>
                  <div className={styles.statWideBg} aria-hidden="true" />
                </div>

                <div className={styles.statCardYellow}>
                  <div className={styles.statKpi}>200+ User</div>
                  <div className={styles.statDesc}>
                    Trusted by countless users for reliable healthcare services. Join our growing community and
                    experience care and support.
                  </div>
                  <div className={styles.avatars} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span className={styles.avatarPlus}>+</span>
                  </div>
                </div>

                <div className={styles.statCardDark}>
                  <div className={styles.stars} aria-label="5 stars">
                    ★★★★★
                  </div>
                  <div className={styles.reviewText}>
                    “I had a great experience with Shifa! The website is easy to navigate, booking an appointment was
                    quick and easy, and the doctors were highly professional and caring.”
                  </div>
                  <div className={styles.reviewName}>Jack T.</div>
                  <div className={styles.reviewKpi}>50k+ reviews</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={styles.services} aria-label="Services">
        <div className={styles.container}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
            <p className={styles.sectionSub}>{t('services.subtitle')}</p>
          </FadeIn>

          <div className={styles.serviceGrid}>
            {services.map((s, i) => (
              <FadeIn key={s.titleKey} delay={i * 70}>
                <div className={styles.serviceCard} onClick={() => handleServiceClick(s)} role="button" tabIndex={0}>
                  <div className={styles.serviceIcon}>{s.icon}</div>
                  <div className={styles.serviceTitle}>{t(`services.${s.titleKey}`)}</div>
                  <div className={styles.serviceDesc}>{t(`services.${s.descKey}`)}</div>
                  {!s.requiresAuth && s.action !== 'emergency' ? (
                    <div className={styles.serviceBadge}>{t('services.noLoginNeeded')}</div>
                  ) : s.action === 'emergency' ? (
                    <div className={styles.emergencyBadge}>{t('services.emergency')}</div>
                  ) : (
                    <div className={styles.authBadge}>{t('services.loginRequired')}</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY MODAL */}
      {showEmergency && (
        <div className={styles.modalOverlay} onClick={() => setShowEmergency(false)}>
          <div className={styles.emergencyModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowEmergency(false)}>✕</button>
            <h2>{t('emergency.title')}</h2>
            <p>{t('emergency.subtitle')}</p>

            {/* Emergency Categories */}
            <div className={styles.emergencyCategories}>
              {[
                { titleKey: 'ambulance', phone: '+91-98765-43210' },
                { titleKey: 'doctor', phone: '+91-98765-43220' },
                { titleKey: 'bloodBank', phone: '+91-98765-43230' },
                { titleKey: 'police', phone: '+91-98765-43240' },
              ].map((item) => (
                <div key={item.titleKey} className={styles.emergencyItem}>
                  <div className={styles.emergencyInfo}>
                    <div className={styles.emergencyTitle}>{t(`emergency.${item.titleKey}`)}</div>
                    <div className={styles.emergencyPhone}>{item.phone}</div>
                  </div>
                  <button className={styles.callBtn} onClick={() => handleEmergencyCall(item.phone)}>
                    {t('emergency.call')}
                  </button>
                </div>
              ))}
            </div>

            {/* Nearby Hospitals */}
            <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>{t('emergency.nearbyHospitals')}</h3>
            {nearbyHospitals.length > 0 ? (
              <div className={styles.hospitalsList}>
                {nearbyHospitals.map((hosp, idx) => (
                  <div key={idx} className={styles.hospitalItem}>
                    <div>
                      <strong>{hosp.name}</strong>
                      <p style={{ fontSize: '0.875rem', color: '#666', margin: '4px 0 0 0' }}>
                        {hosp.distance} km away
                      </p>
                    </div>
                    <button className={styles.callBtn} onClick={() => handleEmergencyCall(hosp.phone)}>
                      📞
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '0.9rem' }}>{t('emergency.fetching')}</p>
            )}
          </div>
        </div>
      )}
      <section id="doctors" className={styles.doctors} aria-label="Doctors">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.doctorHead}>
              <h2 className={styles.doctorTitle}>{t('doctors.title')}</h2>
              <p className={styles.doctorSub}>{t('doctors.subtitle')}</p>
            </div>
          </FadeIn>

          <div className={styles.doctorGrid}>
            {doctors.map((d, idx) => (
              <FadeIn key={d.name} delay={idx * 90}>
                <div className={`${styles.doctorCard} ${idx === 1 ? styles.doctorCardActive : ''}`}>
                  <img className={styles.docImg} src={d.img} alt={d.name} loading="lazy" />
                  <div className={styles.docInfo}>
                    <div className={styles.docName}>{d.name}</div>
                    <div className={styles.docSpec}>{d.specialty}</div>
                    <div className={styles.docSocial} aria-label="Social links">
                      <a className={styles.docIcon} href="#" aria-label="Social" />
                      <a className={styles.docIcon} href="#" aria-label="Social" />
                      <a className={styles.docIcon} href="#" aria-label="Social" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className={styles.doctorBtnRow}>
              <Button variant="primary" size="md" as="a" href="#doctors">
                {t('doctors.viewAll')}
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="blog" className={styles.testimonials} aria-label="Testimonials">
        <div className={styles.container}>
          <div className={styles.testGrid}>
            <FadeIn>
              <div>
                <h2 className={styles.testTitle}>{t('testimonials.title')}</h2>
                <p className={styles.testSub}>{t('testimonials.subtitle')}</p>
                <div className={styles.testIndex}>{tIndex + 1}/{testimonialTotal}</div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className={styles.testCard}>
                <div className={styles.testTop}>
                  <div className={styles.testStars}>★★★★★</div>
                  <div className={styles.testNav}>
                    <button
                      className={styles.navBtn}
                      type="button"
                      aria-label="Previous"
                      onClick={() => setTIndex((v) => (v - 1 + testimonials.length) % testimonials.length)}
                    />
                    <button
                      className={styles.navBtn}
                      type="button"
                      aria-label="Next"
                      onClick={() => setTIndex((v) => (v + 1) % testimonials.length)}
                    />
                  </div>
                </div>

                <p className={styles.testText}>"{currentTestimonial.text}"</p>
                <div className={styles.testName}>{currentTestimonial.name}</div>

                <div className={styles.testThumbs} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.contact} aria-label="Contact">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <h2 className={styles.contactTitle}>{t('contact.title')}</h2>
                <p className={styles.contactSub}>{t('contact.subtitle')}</p>

                <div className={styles.contactList}>
                  <div className={styles.contactItem}><span className={styles.dot} aria-hidden="true" /> {t('contact.phone')}</div>
                  <div className={styles.contactItem}><span className={styles.dot} aria-hidden="true" /> {t('contact.email')}</div>
                  <div className={styles.contactItem}><span className={styles.dot} aria-hidden="true" /> {t('contact.address')}</div>
                </div>

                <form className={styles.form} onSubmit={onSubmit} noValidate>
                  <div className={styles.formGrid}>
                    <Field
                      label={t('contact.fullName')}
                      id="name"
                      placeholder={t('contact.yourName')}
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      error={errors.name}
                      autoComplete="name"
                    />
                    <Field
                      label={t('contact.email_label')}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      error={errors.email}
                      autoComplete="email"
                    />
                    <TextArea
                      label={t('contact.message')}
                      id="message"
                      rows={4}
                      placeholder={t('contact.howCanWeHelp')}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      error={errors.message}
                    />
                  </div>

                  <div className={styles.formActions}>
                    <Button variant="primary" size="md" type="submit" disabled={submitState.status === 'loading'}>
                      {submitState.status === 'loading' ? t('contact.sending') : t('contact.send')}
                    </Button>
                    <div
                      className={`${styles.formNote} ${
                        submitState.status === 'success'
                          ? styles.noteOk
                          : submitState.status === 'error'
                            ? styles.noteErr
                            : ''
                      }`}
                      role={submitState.status === 'idle' ? undefined : 'status'}
                    >
                      {submitState.message}
                    </div>
                  </div>
                </form>
              </div>

              <div className={styles.mapCard}>
                <img className={styles.mapImg} src={map} alt="Map" loading="lazy" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} aria-label="CTA">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
              <p className={styles.ctaSub}>
                {t('cta.subtitle')}
              </p>
              <div className={styles.ctaBtns}>
                <Button variant="primary" size="lg" as="a" href="#contact">{t('hero.bookAppointment')}</Button>
                <Button variant="secondary" size="lg" as="a" href="#contact">{t('hero.contactUs')}</Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
