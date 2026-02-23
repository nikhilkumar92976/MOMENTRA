import React, { useContext, useState } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

const BlackPlaceholderImage =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgCiAgPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMWYyZTM3IiAvPgo8L3N2Zz4='

const FollowersModal = ({ type = 'followers' }) => {
  const { profile, closeFollowersModal, closeFollowingModal, followingUsers, toggleFollowUser } =
    useContext(ProfileContext)
  const [loadingFollow, setLoadingFollow] = useState(null)

  const users = type === 'followers' ? profile?.followers || [] : profile?.following || []
  const closeModal = type === 'followers' ? closeFollowersModal : closeFollowingModal
  const title = type === 'followers' ? 'Followers' : 'Following'

  const handleFollowToggle = async (userId) => {
    setLoadingFollow(userId)
    try {
      // Toggle follow state
      toggleFollowUser(userId)
      // TODO: Call backend API to follow/unfollow
      // await fetch(`${API_BASE}/auth/follow/:userId`, ...)
    } finally {
      setLoadingFollow(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-sm max-h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={closeModal} className="text-2xl hover:text-gray-400 transition font-light">
            ×
          </button>
        </div>

        {!users || users.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No {title.toLowerCase()} yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user, idx) => {
              const isFollowing = followingUsers.has(user._id || user.id)

              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-black/30 rounded-lg hover:bg-black/40 transition">
                  {/* User Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={user.profile_pic || BlackPlaceholderImage}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      alt={user.username}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = BlackPlaceholderImage
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{user.fullname || user.username || 'User'}</p>
                      <p className="text-gray-400 text-sm truncate">@{user.username}</p>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => handleFollowToggle(user._id || user.id)}
                    disabled={loadingFollow === (user._id || user.id)}
                    className={`px-3 py-1 rounded text-sm font-medium transition whitespace-nowrap ml-2 flex-shrink-0 ${
                      isFollowing
                        ? 'bg-red-600 hover:bg-red-700 text-white disabled:opacity-50'
                        : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
                    }`}
                  >
                    {loadingFollow === (user._id || user.id)
                      ? '...'
                      : isFollowing
                        ? 'Unfollow'
                        : 'Follow'}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <button
          onClick={closeModal}
          className="w-full mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default FollowersModal
