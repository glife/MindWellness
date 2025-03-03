import { useState, useEffect } from "react";
import { Home, Book, MessageCircle, Heart, AlertTriangle, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Community() {
  const [nickname, setNickname] = useState("");
  const [isNicknameSet, setIsNicknameSet] = useState(false);
  const [posts, setPosts] = useState([
    { user: "Anonymous", message: "Just finished my journal entry for today! 😊", time: formatDateTime() },
    { user: "Anonymous", message: "Does anyone have self-care tips for stressful days?", time: formatDateTime() },
  ]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");

  // Ensure nickname is properly updated
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    console.log("Stored Nickname:", storedNickname); // Debugging
    if (storedNickname && storedNickname.trim() !== "") {
      setNickname(storedNickname);
      setIsNicknameSet(true);
    } else {
      setIsNicknameSet(false);
    }
  }, []);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8081/chat/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages.");
      }
    };
  
    fetchPosts();
  }, []);
  

  function formatDateTime() {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }

  const handleSetNickname = async () => {
    console.log("Button clicked!");  // Debugging
    
    if (nickname.trim() === "") {
      setError("Nickname cannot be empty.");
      console.log("Error: Nickname is empty.");
      return;
    }
  
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      console.log("Sending request with:", { nickname, token });
  
      const response = await axios.post(
        "http://localhost:8081/chat/set-nickname",
        { nickname },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Response:", response.data);  // Debugging response
  
      if (response.status === 200) {
        localStorage.setItem("nickname", nickname);
        setIsNicknameSet(true);
        console.log("Nickname set successfully!");
      }
    } catch (error) {
      console.error("Error setting nickname:", error.response?.data || error);
      setError(error.response?.data || "An error occurred while setting the nickname.");
    }
  };
  
  

  const handlePost = () => {
    if (newPost.trim() !== "") {
      setPosts([{ user: nickname || "Anonymous", message: newPost, time: formatDateTime() }, ...posts]);
      setNewPost("");
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
            <NavItem icon={<Home />} label="Dashboard" to="/dashboard" />
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
              {posts.length === 0 ? (
                <p className="text-gray-400 text-center">No messages yet. Be the first to share!</p>
              ) : (
                posts.map((post, index) => (
                  <Card key={index} className="p-4 bg-gray-800 rounded-2xl shadow-lg w-full">
                    <p className="text-pink-400 font-semibold">
                      {post.user || "Anonymous"}
                      <span className="text-gray-400 text-sm"> 📅 {post.time}</span>
                    </p>
                    <p className="text-white mt-1">{post.message}</p>
                  </Card>
                ))
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
