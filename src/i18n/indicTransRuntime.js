const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const CACHE_PREFIX = 'indictrans2-runtime'
const CHUNK_SIZE = 25

const SUPPORTED_LANGS = new Set([
  'en',
  'hi',
  'bn',
  'ta',
  'te',
  'kn',
  'ml',
  'gu',
  'pa',
  'mr',
  'od',
  'as'
])

function flattenObject(obj, prefix = '', output = {}) {
  Object.entries(obj || {}).forEach(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, nextKey, output)
      return
    }

    output[nextKey] = value
  })

  return output
}

function chunk(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

function getStorageKey(lang) {
  return `${CACHE_PREFIX}:${lang}`
}

function readCachedBundle(lang) {
  try {
    const raw = localStorage.getItem(getStorageKey(lang))
    if (!raw) return null

    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeCachedBundle(lang, bundle) {
  try {
    localStorage.setItem(getStorageKey(lang), JSON.stringify(bundle))
  } catch {
    // Ignore localStorage quota errors.
  }
}

async function translateBatch({ texts, sourceLang, targetLang }) {
  const response = await fetch(`${API_BASE}/api/translate/indictrans2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      texts,
      sourceLang,
      targetLang
    })
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Translation request failed: ${message}`)
  }

  const data = await response.json()
  return data.translations || []
}

export async function hydrateLanguageFromEnglish(i18n, targetLang) {
  const normalizedTarget = String(targetLang || '').toLowerCase().split('-')[0]

  if (!SUPPORTED_LANGS.has(normalizedTarget) || normalizedTarget === 'en') {
    return
  }

  const namespace = 'translation'
  const sourceBundle = i18n.getResourceBundle('en', namespace)
  if (!sourceBundle) return

  const sourceFlat = flattenObject(sourceBundle)
  const targetBundle = i18n.getResourceBundle(normalizedTarget, namespace) || {}
  const targetFlat = flattenObject(targetBundle)

  const cachedBundle = readCachedBundle(normalizedTarget)
  if (cachedBundle && typeof cachedBundle === 'object') {
    i18n.addResourceBundle(normalizedTarget, namespace, cachedBundle, true, true)
  }

  const missingEntries = Object.entries(sourceFlat).filter(([key]) => {
    const existing = i18n.getResource(normalizedTarget, namespace, key)
    return existing == null
  })

  if (missingEntries.length === 0) return

  const missingKeys = missingEntries.map(([key]) => key)
  const missingTexts = missingEntries.map(([, value]) => String(value))

  const mergedFlat = {
    ...targetFlat,
    ...(flattenObject(readCachedBundle(normalizedTarget) || {}))
  }

  const textChunks = chunk(missingTexts, CHUNK_SIZE)
  const keyChunks = chunk(missingKeys, CHUNK_SIZE)

  for (let i = 0; i < textChunks.length; i += 1) {
    const currentTextChunk = textChunks[i]
    const translations = await translateBatch({
      texts: currentTextChunk,
      sourceLang: 'en',
      targetLang: normalizedTarget
    })

    keyChunks[i].forEach((key, idx) => {
      mergedFlat[key] = translations[idx] || currentTextChunk[idx]
      i18n.addResource(normalizedTarget, namespace, key, mergedFlat[key], {
        silent: true
      })
    })
  }

  // Persist the hydrated bundle so repeat visits avoid API calls.
  writeCachedBundle(normalizedTarget, i18n.getResourceBundle(normalizedTarget, namespace))
}

export function getIndicSupportedLanguages() {
  return Array.from(SUPPORTED_LANGS)
}
