import React from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiHome,
  FiSearch,
  FiVideo,
  FiUser,
  FiPlus,
  FiPlayCircle,
} from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import {Link} from 'react-router-dom'

const stories = [
  { id: 1, name: "Your story", img: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "rahul", img: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "tanmay", img: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "singh", img: "https://i.pravatar.cc/150?img=4" },
];

const posts = [
  {
    id: 1,
    username: "coco.bhaii",
    profile: "https://i.pravatar.cc/150?img=5",
    mediaType: "video",
    media:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: "1.6M",
    caption: "TCS Pattern Based Questions ✅",
    time: "12 hours ago",
  },
  {
    id: 2,
    username: "ishankishan23",
    profile: "https://i.pravatar.cc/150?img=6",
    mediaType: "image",
    media:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    likes: "1.2M",
    caption: "Job's not finished!",
    time: "10 hours ago",
  },
];

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen text-white max-w-md mx-auto relative">

      {/* 🔝 Top Navbar */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-black z-50 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <FiPlus className="text-xl" />
          <h1 className="font-semibold text-lg tracking-wide">Momentra</h1>
          <FiHeart className="text-xl" />
        </div>

        {/* Stories */}
        <div className="flex gap-4 px-4 py-3 overflow-x-auto no-scrollbar">
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 p-[2px]">
                <img
                  src={story.img}
                  className="w-full h-full rounded-full object-cover bg-black"
                  alt=""
                />
              </div>
              <p className="text-xs mt-1 text-gray-300 truncate w-16">
                {story.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 📸 Feed */}
      <div className="pt-[160px] pb-20">
        {posts.map((post) => (
          <div key={post.id} className="mb-6">

            {/* Post Header */}
            <div className="flex items-center justify-between  px-4 py-3">
              <div className="flex items-center  ">
                <img
                  src={post.profile}
                  className="w-9 h-9 rounded-full mr-3"
                  alt=""
                />
                <span className="text-sm font-medium">
                  {post.username}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <button className="bg-gray-700 px-4 py-1 rounded-md text-sm">
                  Follow
                </button>
                <CiMenuKebab/>
              </div>

            </div>

            {/* Media */}
            {post.mediaType === "image" ? (
              <img
                src={post.media}
                className="w-full max-h-[500px] object-cover"
                alt=""
              />
            ) : (
              <video
                src={post.media}
                controls
                className="w-full max-h-[500px] object-cover"
              />
            )}

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex gap-4 text-xl">
                <FiHeart />
                <FiMessageCircle />
                <FiSend />
              </div>
              <FiBookmark className="text-xl" />
            </div>

            {/* Likes & Caption */}
            <div className="px-4 text-sm">
              <p className="font-semibold mb-1">
                {post.likes} likes
              </p>
              <p>
                <span className="font-semibold mr-2">
                  {post.username}
                </span>
                <span className="text-gray-300">
                  {post.caption}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {post.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ⬇️ Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black border-t border-gray-800 flex justify-around py-3 text-xl">
        <FiHome />
        <FiPlayCircle />
        <FiSend />
        <FiSearch />
        <Link to='/profile'><FiUser /></Link>
      </div>
    </div>
  );
};

export default HomePage;
