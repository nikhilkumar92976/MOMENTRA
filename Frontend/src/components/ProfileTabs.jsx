import React, { useState } from 'react'
import { FaTh, FaUserTag } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'

const ProfileTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-around border-t border-b border-gray-800 py-3 text-lg">
      <button
        onClick={() => onTabChange('posts')}
        className={`transition ${activeTab === 'posts' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <FaTh />
      </button>
      <button
        onClick={() => onTabChange('saved')}
        className={`transition ${activeTab === 'saved' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <FiRepeat />
      </button>
      <button
        onClick={() => onTabChange('tagged')}
        className={`transition ${activeTab === 'tagged' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <FaUserTag />
      </button>
    </div>
  )
}

export default ProfileTabs
