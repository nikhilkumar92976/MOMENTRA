import React, { memo } from 'react'

const isValidUrl = (s) => {
  try {
    return /^https?:\/\//.test(s)
  } catch (e) { return false }
}

const PostGrid = ({ posts = [] }) => {
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
            <div key={idx} className="w-full aspect-square bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
              No image
            </div>
          )
        }

        return (
          <img
            key={idx}
            src={src}
            alt={`post ${idx}`}
            loading="lazy"
            decoding="async"
            className="w-full aspect-square object-cover hover:opacity-80 transition cursor-pointer"
          />
        )
      })}
    </div>
  )
}

export default memo(PostGrid)
