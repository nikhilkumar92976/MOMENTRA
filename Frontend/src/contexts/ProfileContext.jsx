import React, { createContext, useState, useCallback } from 'react'

export const ProfileContext = createContext(null)

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingModal, setEditingModal] = useState(false)
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [showFollowingModal, setShowFollowingModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showPostDetail, setShowPostDetail] = useState(false)
  const [followingUsers, setFollowingUsers] = useState(new Set())

  const updateProfile = useCallback((updatedData) => {
    setProfile(prev => ({ ...prev, ...updatedData }))
  }, [])

  const openEditModal = useCallback(() => setEditingModal(true), [])
  const closeEditModal = useCallback(() => setEditingModal(false), [])

  const openFollowersModal = useCallback(() => setShowFollowersModal(true), [])
  const closeFollowersModal = useCallback(() => setShowFollowersModal(false), [])

  const openFollowingModal = useCallback(() => setShowFollowingModal(true), [])
  const closeFollowingModal = useCallback(() => setShowFollowingModal(false), [])

  const openPostDetail = useCallback((post) => {
    setSelectedPost(post)
    setShowPostDetail(true)
  }, [])

  const closePostDetail = useCallback(() => {
    setShowPostDetail(false)
    setSelectedPost(null)
  }, [])

  const toggleFollowUser = useCallback((userId) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }, [])

  const value = {
    profile,
    setProfile,
    loading,
    setLoading,
    error,
    setError,
    editingModal,
    openEditModal,
    closeEditModal,
    showFollowersModal,
    openFollowersModal,
    closeFollowersModal,
    showFollowingModal,
    openFollowingModal,
    closeFollowingModal,
    saving,
    setSaving,
    updateProfile,
    selectedPost,
    showPostDetail,
    openPostDetail,
    closePostDetail,
    followingUsers,
    toggleFollowUser,
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
