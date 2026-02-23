import React, { useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

const PostDetailModal = () => {
  const { selectedPost, closePostDetail } = useContext(ProfileContext)

  if (!selectedPost) return null

  const post = selectedPost
  const imageUrl = typeof post === 'string' ? post : post.image || post.url

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closePostDetail}>
      <div
        className="bg-black border border-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-black/95">
          <h3 className="font-semibold text-lg">Post</h3>
          <button
            onClick={closePostDetail}
            className="text-2xl hover:text-gray-400 transition font-light"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="post detail"
              className="w-full rounded-lg object-cover max-h-[60vh]"
            />
          )}

          {/* Caption */}
          {post.caption && (
            <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
              <p className="text-sm">{post.caption}</p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-4 flex gap-6 text-sm text-gray-400">
            <div>
              <span className="text-white font-semibold">{post.likes?.length || 0}</span> likes
            </div>
            <div>
              <span className="text-white font-semibold">{post.comments?.length || 0}</span> comments
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition font-medium">
              ♥ Like
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg transition font-medium">
              💬 Comment
            </button>
          </div>

          {/* Comments Section */}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-semibold">Comments</h4>
              {post.comments.map((comment, idx) => (
                <div key={idx} className="p-3 bg-gray-900/50 rounded-lg">
                  <p className="text-xs text-gray-400">
                    {comment.user?.username || 'Anonymous'}
                  </p>
                  <p className="text-sm mt-1">{comment.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetailModal
