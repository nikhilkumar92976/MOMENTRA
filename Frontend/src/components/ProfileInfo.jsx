import React, { useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

const BlackPlaceholderImage =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGPHJLY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwYzBjMGMiIC8+Cjwvc3ZnPg=='

const ProfileInfo = ({ posts = [] }) => {
  const { profile, openEditModal, openFollowersModal, openFollowingModal, saving } = useContext(ProfileContext)

  if (!profile) {
    return <div className="px-4 py-5 text-center text-gray-400">Loading profile...</div>
  }

  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profile.profile_pic || BlackPlaceholderImage}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
            alt="profile"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src = BlackPlaceholderImage
            }}
          />
          <div className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition">
            +
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-center">
          <div>
            <p className="font-semibold text-lg">{posts.length}</p>
            <p className="text-gray-400 text-sm">posts</p>
          </div>
          <button
            onClick={openFollowersModal}
            className="hover:text-blue-400 transition text-left focus:outline-none"
          >
            <p className="font-semibold text-lg">{profile.followers?.length || 0}</p>
            <p className="text-gray-400 text-sm">followers</p>
          </button>
          <button
            onClick={openFollowingModal}
            className="hover:text-blue-400 transition text-left focus:outline-none"
          >
            <p className="font-semibold text-lg">{profile.following?.length || 0}</p>
            <p className="text-gray-400 text-sm">following</p>
          </button>
        </div>
      </div>

      {/* Name & Bio */}
      <p className="mt-4 font-medium text-base">{profile.fullname || profile.username || 'Your name'}</p>
      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{profile.bio || ''}</p>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={openEditModal}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2 rounded-md text-sm font-medium transition disabled:opacity-50"
          disabled={!profile || saving}
        >
          {saving ? 'Saving...' : 'Edit profile'}
        </button>
        <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2 rounded-md text-sm font-medium transition">
          Share profile
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
