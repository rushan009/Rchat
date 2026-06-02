import { useEffect, useState } from "react"
import { createConversation, getConversations } from "@/services/conversation.service"
import { useAuth } from "@/context/AuthContext"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { searchUsers } from "@/services/user.service"
const ChatList = ({selectedConversation, setSelectedConversation }) => {
    const {currentUser} = useAuth()
    const currentUserId = currentUser._id
    console.log(currentUserId);
    console.log(typeof currentUserId)

    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [searchResult, setSearchResult] = useState([])    
    const [conversations, setConversations] = useState([])

    console.log(searchQuery);
    console.log(searchResult);
    console.log(isSearching);
    

    useEffect(()=>{
        const fetch = async () => {
            const data = await getConversations()
            setConversations(data)
        }
        fetch()
    }, [])
    console.log(conversations);

    const handleSearch = async (e) =>{
        const query = e.target.value;
        setSearchQuery(query)
        if (query.trim()) {
            setIsSearching(true);
            const result = await searchUsers(query);
            setSearchResult(result)
        }
        else{
            setIsSearching(false);
            setSearchResult([]);
        }

    }
   const handleSelectUser = async (user) => {
    console.log('selecting user', user)
    const conversation = await createConversation(user._id)
    console.log('conversation created', conversation)
    
    // add to list if not already there
    setConversations(prev => {
        const exists = prev.find(c => c._id === conversation._id)
        if (exists) return prev
        return [conversation, ...prev]
    })
    
    setSelectedConversation(conversation)
    setIsSearching(false)
    setSearchQuery('')
}
    
  return (
    
        <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="border-b border-white/10 bg-slate-900/40 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Chats</p>
                <h2 className="mt-1 text-lg font-semibold text-white">Conversations</h2>
                <div className="mt-4">
                    <Input
                        className="h-11 border-white/10 bg-slate-950/70 text-white placeholder:text-white/35 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={handleSearch}

                    />
                </div>
            </div>

            <ScrollArea className="flex-1 px-3 py-3">
                {isSearching ? (
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-lg shadow-black/20">
                        {searchResult.length === 0 ? (
                            <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-6 text-center text-sm text-white/50">
                                No users found. Try another name.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {searchResult.map((user)=>{
                                    return (
                                        <div
                                            key={user._id}
                                            onClick={()=>{handleSelectUser(user)}}
                                            className="group w-full cursor-pointer rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 shadow-lg shadow-black/10 transition hover:border-cyan-400/30 hover:bg-slate-800/85"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-sm font-semibold text-white">
                                                    {user?.username?.[0]?.toUpperCase() || "U"}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <p className="truncate text-sm font-medium text-white">
                                                            {user.username}
                                                        </p>
                                                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-white/45 transition group-hover:text-cyan-200/80">
                                                            Start
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 truncate text-xs leading-5 text-white/45">
                                                        Click to create or open chat
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {
                            conversations.map((conversation)=>{
                                    console.log(typeof conversation.participants[0]._id)
                                    const otherPerson = conversation.participants.find(function(participant){
                                            return participant._id !== currentUserId
                                    })

                                 return (
                                     <div
                                         className={conversation._id === selectedConversation?._id ? "cursor-pointer rounded-2xl border border-cyan-400/30 bg-slate-800/90 px-4 py-4 shadow-lg shadow-black/20 transition" : "cursor-pointer rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 shadow-lg shadow-black/10 transition hover:bg-slate-800/80"}
                                         key={conversation._id}
                                         onClick={()=>{setSelectedConversation(conversation)}}
                                     >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-sm font-semibold text-white">
                                                    {otherPerson?.username?.[0]?.toUpperCase() || "C"}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <p className="truncate text-sm font-medium text-white">
                                                            {otherPerson.username}
                                                        </p>
                                                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-white/45">
                                                            Chat
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 truncate text-xs leading-5 text-white/45">
                                                        Tap to open this conversation
                                                    </p>
                                                </div>
                                            </div>
                                     </div>
                                 )
                            })
                        }
                    </div>
                )}
            </ScrollArea>

            
        </div>
  )
}

export default ChatList