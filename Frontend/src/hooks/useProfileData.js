import { useEffect, useContext, useCallback } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export const useProfileData = (userId) => {
  const { setProfile, setLoading, setError, profile } = useContext(ProfileContext)
  const cacheKey = userId ? `profile_${userId}` : null

  const loadFromCache = useCallback(() => {
    if (!cacheKey) return null
    try {
      const raw = localStorage.getItem(cacheKey)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed.data
    } catch (e) {
      return null
    }
  }, [cacheKey])

  const saveToCache = useCallback((data) => {
    if (!cacheKey) return
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }))
    } catch (e) {
      // ignore cache write errors
    }
  }, [cacheKey])

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    let cancelled = false
    const controller = new AbortController()

    // Load from cache immediately
    const cached = loadFromCache()
    if (cached) {
      setProfile(cached)
      setLoading(false)
    }

    try {
      const res = await fetch(`${API_BASE}/auth/profile/${userId}`, {
        credentials: 'include',
        signal: controller.signal,
      })

      if (!res.ok) throw new Error('Failed to load profile')
      const data = await res.json()

      if (cancelled) return

      if (data && data.user) {
        setProfile(data.user)
        saveToCache(data.user)
        setError(null)
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      console.error('Profile load error', err)
      setError(err.message)
    } finally {
      if (!cancelled) setLoading(false)
    }

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [userId, setProfile, setLoading, setError, loadFromCache, saveToCache])

  useEffect(() => {
    fetchProfile()
  }, [userId])

  const refetchProfile = useCallback(async () => {
    setLoading(true)
    await fetchProfile()
  }, [fetchProfile, setLoading])

  return { profile, refetchProfile }
}

export default useProfileData
