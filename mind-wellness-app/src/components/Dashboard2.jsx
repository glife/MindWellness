import { useState } from "react";
import { Menu, NotebookText, Smile, MessageCircle, LifeBuoy, Wind, Home } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";


export default function Dashboard() {
  const [journal, setJournal] = useState("");
  
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-20 bg-gray-800 flex flex-col items-center py-5 space-y-6 shadow-lg">
        <Menu className="text-gray-400 cursor-pointer" size={28} />
        <Home className="text-gray-300 cursor-pointer" size={24} />
        <Smile className="text-gray-300 cursor-pointer" size={24} />
        <NotebookText className="text-gray-300 cursor-pointer" size={24} />
        <Wind className="text-gray-300 cursor-pointer" size={24} />
        <MessageCircle className="text-gray-300 cursor-pointer" size={24} />
        <LifeBuoy className="text-red-400 cursor-pointer" size={24} />
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-4">
        {/* Greeting & Affirmation */}
        <Card className="bg-gray-800 p-5 rounded-xl shadow-md">
          <CardContent>
            <h2 className="text-xl font-semibold">Hello, Gunjan! 💙</h2>
            <p className="text-gray-400 mt-2 italic">“You are doing amazing, keep going!”</p>
          </CardContent>
        </Card>

        {/* Journal Section */}
        <Card className="bg-gray-800 p-5 rounded-xl shadow-md">
          <CardContent>
            <h3 className="text-lg font-semibold">Private Journal</h3>
            <textarea
              className="w-full h-32 p-3 mt-3 bg-gray-700 rounded-lg text-white focus:outline-none"
              placeholder="Write your thoughts here..."
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
            ></textarea>
            <Button className="mt-3 bg-blue-500 hover:bg-blue-600">Save Entry</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
