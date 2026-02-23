import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const BlackPlaceholderImage =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgCiAgPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMWYyZTM3IiAvPgo8L3N2Zz4='

const EditProfileModal = () => {
  const { profile, closeEditModal, setSaving, saving, updateProfile, setProfile } = useContext(ProfileContext)

  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')

  // Initialize form with current profile data
  useEffect(() => {
    if (profile) {
      setFullname(profile.fullname || '')
      setUsername(profile.username || '')
      setBio(profile.bio || '')
      setDateOfBirth(profile.date_of_birth || '')
      setPreview(profile.profile_pic || BlackPlaceholderImage)
    }
  }, [profile])

  // Generate preview URL when file is selected
  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullname || !username) {
      alert('Full name and username are required')
      return
    }

    const prev = profile
    const optimistic = { ...profile, fullname, username, bio, date_of_birth: dateOfBirth }
    updateProfile(optimistic)
    setSaving(true)

    try {
      const form = new FormData()
      form.append('fullname', fullname)
      form.append('username', username)
      form.append('bio', bio)
      form.append('date_of_birth', dateOfBirth)
      if (file) form.append('image', file)

      const res = await fetch(`${API_BASE}/auth/update-user-profile`, {
        method: 'PATCH',
        credentials: 'include',
        body: form,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error((data && data.message) || 'Update failed')
      }

      // Update with server response
      if (data && data.userData) {
        setProfile(data.userData)
        try {
          localStorage.setItem(`profile_${profile._id}`, JSON.stringify({ ts: Date.now(), data: data.userData }))
        } catch (e) {
          // ignore
        }
        try {
          localStorage.setItem('user', JSON.stringify(data.userData))
        } catch (e) {
          // ignore
        }
      }

      closeEditModal()
    } catch (err) {
      console.error(err)
      setProfile(prev)
      alert(err.message || 'Unable to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (!profile) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="font-semibold text-lg mb-4">Edit profile</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <img
              src={preview || BlackPlaceholderImage}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
              alt="preview"
              loading="lazy"
              onError={(e) => {
                e.target.src = BlackPlaceholderImage
              }}
            />
            <label className="cursor-pointer">
              <div className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition">
                Change photo
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Full name *</label>
            <input
              className="w-full bg-black/30 border border-gray-700 p-2 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username *</label>
            <input
              className="w-full bg-black/30 border border-gray-700 p-2 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full bg-black/30 border border-gray-700 p-2 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of birth</label>
            <input
              className="w-full bg-black/30 border border-gray-700 p-2 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition disabled:opacity-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
