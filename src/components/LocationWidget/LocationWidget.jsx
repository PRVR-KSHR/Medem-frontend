import { useState, useEffect } from 'react'
import styles from './LocationWidget.module.css'

export default function LocationWidget() {
  const [location, setLocation] = useState({ city: '', state: '', error: null, loading: false })
  const [showMap, setShowMap] = useState(false)

  const handleLocateMe = () => {
    setLocation({ ...location, loading: true, error: null })
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // In a real app, you'd use reverse geocoding to get city/state
          // For now, we'll use mock data based on common Indian city coordinates
          
          // Mock mapping of coordinates to cities (simplified)
          const mockCities = {
            'patna': { lat: 25.5941, lon: 85.1376, state: 'Bihar' },
            'ranchi': { lat: 23.3441, lon: 85.3096, state: 'Jharkhand' },
            'kolkata': { lat: 22.5726, lon: 88.3639, state: 'West Bengal' },
            'lucknow': { lat: 26.8467, lon: 80.9462, state: 'Uttar Pradesh' },
            'indore': { lat: 22.7196, lon: 75.8577, state: 'Madhya Pradesh' },
            'bhubaneswar': { lat: 20.2961, lon: 85.8245, state: 'Odisha' }
          }

          // Find nearest city (simplified logic)
          let nearestCity = 'Current Location'
          let nearestState = 'India'
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
        (error) => {
          setLocation({
            ...location,
            error: 'Unable to get location. Please enable geolocation.',
            loading: false
          })
        }
      )
    } else {
      setLocation({
        ...location,
        error: 'Geolocation not supported by your browser.',
        loading: false
      })
    }
  }

  // Auto-detect on mount
  useEffect(() => {
    handleLocateMe()
  }, [])

  return (
    <div className={styles.widget}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.icon}>📍</div>
          <div className={styles.text}>
            <div className={styles.label}>Your Location</div>
            <div className={styles.location}>
              {location.loading ? (
                'Detecting...'
              ) : location.error ? (
                <span className={styles.error}>{location.error}</span>
              ) : (
                <>
                  <strong>{location.city}</strong>, {location.state}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            onClick={handleLocateMe} 
            className={styles.locateBtn}
            disabled={location.loading}
            title="Refresh location"
          >
            {location.loading ? '⏳' : '🔄'} Locate Me
          </button>
          {location.lat && (
            <button 
              onClick={() => setShowMap(!showMap)}
              className={styles.mapBtn}
              title="Show nearby hospitals on map"
            >
              🗺️ Map
            </button>
          )}
        </div>
      </div>

      {showMap && location.lat && (
        <div className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <p>🗺️ Map View (Coming Soon)</p>
            <small>Nearby hospitals within 25km</small>
            <p className={styles.coords}>
              Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
