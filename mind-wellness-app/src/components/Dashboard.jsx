import { useState } from "react";
import { Home, Book, MessageCircle, Heart, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css"

export default function Dashboard() {
  const [journal, setJournal] = useState("");
  const affirmations = [
    "You are enough.",
    "Every day is a fresh start.",
    "You are stronger than you think.",
  ];
  const dailyAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  // Sample data for the weekly mood analysis chart
  const moodData = [
    { day: "Mon", mood: 3 },
    { day: "Tue", mood: 4 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 2 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 5 },
    { day: "Sun", mood: 3 },
  ];

  return (
    <div id="dashboard">
    <div className="flex h-screen bg-gradient-to-br from-blue-500 to-green-300 text-white">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-gray-800 p-4 flex flex-col gap-6">
        <nav className="flex flex-col gap-4">
          <NavItem icon={<Home />} label="Dashboard" />
          <NavItem icon={<Book />} label="AI Chat" />
          <NavItem icon={<Heart />} label="Self-Care" />
          <NavItem icon={<MessageCircle />} label="Community" />
          <NavItem icon={<AlertTriangle />} label="Crisis Support" />
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="w-[800px] p-6 space-y-6 overflow-auto flex flex-col">
        {/* User Info */}
        <Card className="p-5 bg-gray-700 rounded-2xl shadow-lg w-full flex flex-col">
          <h1 className="text-lg font-semibold">Hello, Gunjan! 💫</h1>
          <p className="text-gray-400 mt-2">Gender: Female | Age: 21</p>
          <p className="text-gray-400">Phone: +91 9876543210 | Email: gunjan@example.com</p>
        </Card>

        {/* Affirmation */}
        <Card className="p-6 bg-purple-700 rounded-2xl shadow-lg w-full text-center">
          <h2 className="text-2xl font-bold text-white">Today's Affirmation</h2>
          <p className="text-lg mt-3 italic text-white bg-gradient-to-r from-pink-500 to-purple-600">"{dailyAffirmation}"</p>
        </Card>

        {/* Journal Entry */}
        <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg w-full flex flex-col">
          <h2 className="text-lg font-semibold">Your Journal 📖</h2>
          <Textarea
            placeholder="Write your thoughts..."
            className="mt-2 p-3 bg-gray-700 text-white rounded-lg"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
          <Button className="mt-2 bg-pink-500 hover:bg-pink-600">Save Entry</Button>
        </Card>

        {/* Weekly Mood Analysis & Self-Care Shortcuts */}
        <div className="flex gap-6">
          {/* Mood Analysis Chart */}
          <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg w-2/3">
            <h2 className="text-lg font-semibold">Weekly Mood Analysis 📊</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moodData}>
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" domain={[1, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#ff4f8a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Self-Care Shortcuts */}
          <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg w-1/3 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Quick Self-Care 💖</h2>
          </Card>
        </div>
      </main>
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
