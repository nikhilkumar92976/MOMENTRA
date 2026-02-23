import React, { memo, useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

const isValidUrl = (s) => {
  try {
    return /^https?:\/\//.test(s)
  } catch (e) {
    return false
  }
}

const PostGrid = ({ posts = [] }) => {
  const { openPostDetail } = useContext(ProfileContext)

  if (!posts || posts.length === 0) return null

  return (
    <div className="grid grid-cols-3 gap-[2px]">
      {posts.map((post, idx) => {
        let src = ''

        // Handle string URLs (legacy)
        if (typeof post === 'string') {
          src = isValidUrl(post) ? post : ''
        }
        // Handle post objects from DB (has image property)
        else if (post && typeof post === 'object') {
          src = post.image || post.url || post.src || ''
        }

        if (!src || !isValidUrl(src)) {
          return (
            <div
              key={idx}
              className="w-full aspect-square bg-gray-800 flex items-center justify-center text-gray-500 text-xs cursor-not-allowed"
            >
              No image
            </div>
          )
        }

        return (
          <button
            key={idx}
            onClick={() => openPostDetail(post)}
            className="w-full aspect-square overflow-hidden relative group focus:outline-none"
          >
            <img
              src={src}
              alt={`post ${idx}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:opacity-75 transition"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white text-2xl">👁</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default memo(PostGrid)
