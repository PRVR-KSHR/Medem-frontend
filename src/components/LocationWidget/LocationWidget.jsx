import { useState, useEffect } from 'react'
import { MapPin, RefreshCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function LocationWidget() {
  const { t } = useTranslation()
  const [location, setLocation] = useState({ city: '', state: '', error: null, loading: false })

  const handleLocateMe = () => {
    setLocation({ ...location, loading: true, error: null })
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          
          const mockCities = {
            'patna': { lat: 25.5941, lon: 85.1376, state: 'Bihar' },
            'ranchi': { lat: 23.3441, lon: 85.3096, state: 'Jharkhand' },
            'kolkata': { lat: 22.5726, lon: 88.3639, state: 'West Bengal' },
            'lucknow': { lat: 26.8467, lon: 80.9462, state: 'Uttar Pradesh' },
            'indore': { lat: 22.7196, lon: 75.8577, state: 'Madhya Pradesh' },
            'bhubaneswar': { lat: 20.2961, lon: 85.8245, state: 'Odisha' }
          }

          let nearestCity = t('location.currentLocation')
          let nearestState = t('location.india')
          let minDistance = Infinity

          for (const [city, coords] of Object.entries(mockCities)) {
            const distance = Math.sqrt(Math.pow(coords.lat - latitude, 2) + Math.pow(coords.lon - longitude, 2))
            if (distance < minDistance && distance < 2) {
              minDistance = distance
              nearestCity = city.charAt(0).toUpperCase() + city.slice(1)
              nearestState = coords.state
            }
          }

          setLocation({
            city: nearestCity,
            state: nearestState,
            lat: latitude,
            lon: longitude,
            error: null,
            loading: false
          })
        },
        () => {
          setLocation({
            ...location,
            error: t('location.error'),
            loading: false
          })
        }
      )
    } else {
      setLocation({
        ...location,
        error: t('location.unsupported'),
        loading: false
      })
    }
  }

  useEffect(() => {
    handleLocateMe()
  }, [])

  return (
    <div className="w-full bg-transparent relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20">
            <MapPin className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-[#DEDBC8]/50 uppercase">{t('location.yourLocation')}</span>
            <div className="text-sm">
              {location.loading ? (
                <span className="text-[#DEDBC8]/80">{t('location.detecting')}</span>
              ) : location.error ? (
                <span className="text-red-400">{location.error}</span>
              ) : (
                <span className="text-[#E1E0CC]">
                  <strong className="font-medium tracking-wide">{location.city}</strong>, <span className="text-[#DEDBC8]/80">{location.state}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleLocateMe} 
          disabled={location.loading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#212121] hover:bg-[#2a2a2a] border border-[#DEDBC8]/10 rounded-full text-xs font-medium text-[#E1E0CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          <RefreshCcw className={`w-3 h-3 ${location.loading ? 'animate-spin opacity-50' : ''}`} />
          <span>{t('location.locateMe')}</span>
        </button>
      </div>
    </div>
  )
}
