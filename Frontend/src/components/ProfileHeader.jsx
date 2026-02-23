import React, { useContext } from 'react'
import { FaPlus, FaSignOutAlt } from 'react-icons/fa'
import { AuthContext } from '../contexts/AuthContext'
import { ProfileContext } from '../contexts/ProfileContext'

const ProfileHeader = () => {
  const { logout } = useContext(AuthContext)
  const { profile } = useContext(ProfileContext)

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logout()
        window.location.href = '/login'
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
      <FaPlus className="text-lg hover:text-gray-300 transition cursor-pointer" />
      <h1 className="font-semibold text-lg">{profile?.username || 'profile'}</h1>
      <button
        onClick={handleLogout}
        className="text-lg hover:text-red-500 transition focus:outline-none"
        title="Logout"
      >
        <FaSignOutAlt />
      </button>
    </div>
  )
}

export default ProfileHeader
