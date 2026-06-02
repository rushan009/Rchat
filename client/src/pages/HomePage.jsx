import { useState } from "react"
import ChatList from "@/components/chat/ChatList"
import ChatWindow from "@/components/chat/ChatWindow"   

const HomePage = () => {
    const [selectedConversation, setSelectedConversation]= useState(null)

  return (
          <div className="flex h-screen bg-slate-950">
            <div className="w-1/3 border-r border-white/10">
                <ChatList 
                    selectedConversation={selectedConversation}
                    setSelectedConversation={setSelectedConversation}
                />
            </div>
            <div className="w-2/3">
                <ChatWindow 
                    conversation={selectedConversation}
                />
            </div>
        </div>
  )
}

export default HomePage