import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const UserProfileModal = ({ userId, onClose }) => {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { followingUsers, toggleFollowUser } = useContext(ProfileContext)

  const isFollowing = followingUsers.has(userId)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/profile/${userId}`, {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to load user profile')
        const data = await res.json()
        if (data && data.user) {
          setUserProfile(data.user)
        }
      } catch (err) {
        console.error('Error loading user profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [userId])

  const handleFollowToggle = async () => {
    toggleFollowUser(userId)
    // TODO: Call backend API to follow/unfollow
    // await fetch(`${API_BASE}/auth/follow/:userId`, ...)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-zinc-900 p-6 rounded-lg">
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-zinc-900 p-6 rounded-lg">
          <p className="text-gray-400">User not found</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black border border-gray-700 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-black/95">
          <h3 className="font-semibold">Profile</h3>
          <button
            onClick={onClose}
            className="text-2xl hover:text-gray-400 transition font-light"
          >
            ×
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-4">
          {/* Profile Pic */}
          <div className="flex items-center justify-center mb-4">
            <img
              src={userProfile.profile_pic || '#000000'}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
              alt={userProfile.username}
              onError={(e) => {
                e.target.src =
                  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGPHJLY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMxZjJlMzciIC8+Cjwvc3ZnPg=='
              }}
            />
          </div>

          {/* Username */}
          <h2 className="text-xl font-semibold text-center">{userProfile.username || 'User'}</h2>
          <p className="text-gray-400 text-center text-sm mt-1">{userProfile.fullname || ''}</p>

          {/* Bio */}
          {userProfile.bio && (
            <p className="text-sm text-gray-300 text-center mt-2 line-clamp-3">{userProfile.bio}</p>
          )}

          {/* Stats */}
          <div className="flex gap-6 text-center mt-4 py-4 border-y border-gray-700">
            <div>
              <p className="font-semibold text-lg">{userProfile.posts?.length || 0}</p>
              <p className="text-gray-400 text-xs">posts</p>
            </div>
            <div>
              <p className="font-semibold text-lg">{userProfile.followers?.length || 0}</p>
              <p className="text-gray-400 text-xs">followers</p>
            </div>
            <div>
              <p className="font-semibold text-lg">{userProfile.following?.length || 0}</p>
              <p className="text-gray-400 text-xs">following</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleFollowToggle}
            className={`w-full mt-4 py-2 rounded-lg font-medium transition ${
              isFollowing
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>

          {/* Posts Preview */}
          {userProfile.posts && userProfile.posts.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Recent Posts</h4>
              <div className="grid grid-cols-3 gap-1">
                {userProfile.posts.slice(0, 6).map((post, idx) => {
                  const imageUrl = typeof post === 'string' ? post : post.image
                  return (
                    <div key={idx} className="aspect-square bg-gray-800 rounded overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={`post ${idx}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal
