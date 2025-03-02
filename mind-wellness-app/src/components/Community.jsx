import { useState, useEffect } from "react";
import { Home, Book, MessageCircle, Heart, AlertTriangle, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import "./Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Community() {
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
  const [posts, setPosts] = useState([
    { user: "Anonymous", message: "Just finished my journal entry for today! 😊", time: formatDateTime() },
    { user: "Anonymous", message: "Does anyone have self-care tips for stressful days?", time: formatDateTime() },
  ]);
  const [newPost, setNewPost] = useState("");
  const [isNicknameSet, setIsNicknameSet] = useState(!!localStorage.getItem("nickname"));

  function formatDateTime() {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }

  const handlePost = () => {
    if (newPost.trim() !== "") {
      setPosts([{ user: nickname || "Anonymous", message: newPost, time: formatDateTime() }, ...posts]);
      setNewPost("");
    }
  };

  const handleSetNickname = () => {
    if (nickname.trim() !== "") {
      localStorage.setItem("nickname", nickname);
      setIsNicknameSet(true);
    }
  };

  function NavItem({ icon, label, to }) {
    return (
      <Link to={to} className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
        {icon}
        <span className="hidden md:block">{label}</span>
      </Link>
    );
  }
  
  return (
    <div id="dashboard">
      <div className="flex h-screen bg-gradient-to-br from-blue-500 to-green-300 text-white">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 bg-gray-800 p-4 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            <NavItem icon={<Home />} label="Dashboard" to="/" />
            <NavItem icon={<Book />} label="AI Chat" />
            <NavItem icon={<Heart />} label="Self-Care" />
            <NavItem icon={<MessageCircle />} label="Community" to="/community" />
            <NavItem icon={<AlertTriangle />} label="Crisis Support" />
          </nav>
        </aside>

        {/* Nickname Prompt */}
        {!isNicknameSet ? (
          <main className="w-[800px] p-6 flex flex-col items-center justify-center space-y-4 bg-[url('/blur.png')] bg-cover bg-center">
            <Card className="p-6 bg-gray-800 rounded-2xl shadow-lg w-full text-center">
              <h1 className="text-lg font-semibold">Enter a Nickname</h1>
              <Textarea
                placeholder="Choose a nickname..."
                className="mt-2 p-3 bg-gray-700 text-white rounded-lg"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button className="mt-2 bg-pink-500 hover:bg-pink-600" onClick={handleSetNickname}>
                Continue
              </Button>
            </Card>
          </main>
        ) : (
          // Community Page
          <main className="w-[800px] p-6 space-y-6 overflow-auto flex flex-col">
            <Card className="p-5 bg-gray-700 rounded-2xl shadow-lg w-full">
              <h1 className="text-lg font-semibold">Community Feed 🗣️</h1>
              <p className="text-gray-400 mt-2">Share your thoughts, ask for advice, and support each other!</p>
            </Card>

            {/* New Post Input */}
            <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg w-full flex flex-col">
              <h2 className="text-lg font-semibold">Share Something 💬</h2>
              <Textarea
                placeholder="What's on your mind?"
                className="mt-2 p-3 bg-gray-700 text-white rounded-lg"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button className="mt-2 bg-pink-500 hover:bg-pink-600 flex items-center gap-2" onClick={handlePost}>
                <Send size={16} /> Post
              </Button>
            </Card>

            {/* Posts Section */}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <Card key={index} className="p-4 bg-gray-800 rounded-2xl shadow-lg w-full">
                  <p className="text-pink-400 font-semibold">
                    {post.user} 
                    <span className="text-gray-400 text-sm"> 📅 {post.time}</span>
                  </p>
                  <p className="text-white mt-1">{post.message}</p>
                </Card>
              ))}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
      {icon}
      <span className="hidden md:block">{label}</span>
    </button>
  );
}
