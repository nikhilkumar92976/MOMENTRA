import React, { useContext, useMemo, useState, Suspense, lazy } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ProfileContext, ProfileProvider } from '../contexts/ProfileContext'
import { useProfileData } from '../hooks/useProfileData'
import ProfileHeader from '../components/ProfileHeader'
import ProfileInfo from '../components/ProfileInfo'
import ProfileTabs from '../components/ProfileTabs'
import EditProfileModal from '../components/EditProfileModal'
import FollowersModal from '../components/FollowersModal'
import PostDetailModal from '../components/PostDetailModal'
import UserProfileModal from '../components/UserProfileModal'
import EmptyPostState from '../components/EmptyPostState'

const PostGrid = lazy(() => import('../components/PostGrid'))

const mockPosts = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
]

const ProfilePageContent = () => {
  const { user: authUser } = useContext(AuthContext)
  const { profile, editingModal, showFollowersModal, showFollowingModal } = useContext(ProfileContext)
  const [activeTab, setActiveTab] = useState('posts')

  const userId = authUser && (authUser._id || authUser.id)
  useProfileData(userId)

  // Memoize posts to avoid unnecessary re-renders
  const posts = useMemo(() => {
    if (profile?.posts && profile.posts.length > 0) {
      return profile.posts
    }
    return mockPosts
  }, [profile?.posts])

  return (
    <div className="bg-black min-h-screen text-white max-w-md mx-auto pb-20">
      {/* Header */}
      <ProfileHeader />

      {/* Profile Info */}
      <ProfileInfo posts={posts} />

      {/* Tabs */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Posts Section */}
      {posts.length > 0 ? (
        <Suspense fallback={<div className="py-10 text-center text-gray-400">Loading posts…</div>}>
          <PostGrid posts={posts} />
        </Suspense>
      ) : (
        <EmptyPostState />
      )}

      {/* Modals */}
      {editingModal && <EditProfileModal />}
      {showFollowersModal && <FollowersModal type="followers" />}
      {showFollowingModal && <FollowersModal type="following" />}
    </div>
  )
}

const ProfilePage = () => {
  return (
    <ProfileProvider>
      <ProfilePageContent />
    </ProfileProvider>
  )
}

export default ProfilePage
