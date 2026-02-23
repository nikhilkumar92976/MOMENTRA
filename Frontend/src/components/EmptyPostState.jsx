import React from 'react'

const EmptyPostState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold mb-2">Create your first post</h2>
      <p className="text-gray-400 text-sm mb-6">Make this space your own.</p>
      <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md transition font-medium">
        Create
      </button>
    </div>
  )
}

export default EmptyPostState
