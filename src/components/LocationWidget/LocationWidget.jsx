import { useState, useEffect } from 'react'
import { MapPin, RefreshCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0
}

function mapGeoError(error, t) {
  if (!error) return t('location.error', { defaultValue: 'Unable to get your location.' })

  if (error.code === 1) return t('location.permissionDenied', { defaultValue: 'Location permission denied.' })
  if (error.code === 2) return t('location.unavailable', { defaultValue: 'Location information is unavailable.' })
  if (error.code === 3) return t('location.timeout', { defaultValue: 'Location request timed out.' })

  return t('location.error', { defaultValue: 'Unable to get your location.' })
}

export default function LocationWidget() {
  const { t } = useTranslation()
  const [location, setLocation] = useState({ city: '', state: '', error: null, loading: false })

  const resolveCity = async (latitude, longitude) => {
    const endpoint = new URL('https://api.bigdatacloud.net/data/reverse-geocode-client')
    endpoint.searchParams.set('latitude', String(latitude))
    endpoint.searchParams.set('longitude', String(longitude))
    endpoint.searchParams.set('localityLanguage', 'en')

    const response = await fetch(endpoint.toString(), { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Reverse geocode request failed')
    }

    const data = await response.json()
    return {
      city: data.city || data.locality || data.principalSubdivision || '',
      state: data.principalSubdivision || data.countryName || ''
    }
  }

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, loading: false, error: t('location.unsupported', { defaultValue: 'Geolocation is not supported by your browser.' }) }))
      return
    }

    setLocation((prev) => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const place = await resolveCity(latitude, longitude)

          if (!place.city) {
            setLocation((prev) => ({
              ...prev,
              city: '',
              state: '',
              loading: false,
              error: t('location.cityNotFound', { defaultValue: 'Could not determine your current city.' })
            }))
            return
          }

          setLocation({
            city: place.city,
            state: place.state,
            error: null,
            loading: false
          })
        } catch {
          setLocation((prev) => ({
            ...prev,
            loading: false,
            error: t('location.lookupFailed', { defaultValue: 'Coordinates found, but city lookup failed.' })
          }))
        }
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: mapGeoError(error, t)
        }))
      },
      GEO_OPTIONS
    )
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
          <MapPin className="w-3 h-3" />
          <span>{location.loading ? t('location.detecting') : 'Locate Me'}</span>
        </button>

        <button 
          onClick={handleLocateMe} 
          disabled={location.loading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#212121] hover:bg-[#2a2a2a] border border-[#DEDBC8]/10 rounded-full text-xs font-medium text-[#E1E0CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          <RefreshCcw className={`w-3 h-3 ${location.loading ? 'animate-spin opacity-50' : ''}`} />
          <span>{t('location.refresh', { defaultValue: 'Refresh' })}</span>
        </button>
      </div>
    </div>
  )
}
