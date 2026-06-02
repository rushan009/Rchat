import { useEffect, useState } from "react";
import { getMessage, sendMessage } from "@/services/message.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketContext";
import { useAuth } from "@/context/AuthContext";

const ChatWindow = ({ conversation }) => {
  console.log(conversation);
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { currentUser } = useAuth();
  const handleSubmit = async () => {
    const data = await sendMessage(conversation, input);
    setMessages([...messages, data]);
    setInput("");
  };
  console.log(input);

  useEffect(() => {
    if (!socket || !conversation) {
      return;
    }
    socket.emit("joinRoom", conversation._id);

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [conversation, socket]);

  useEffect(() => {
    if (!conversation) {
      return;
    }
    const fetch = async () => {
      const data = await getMessage(conversation);
      setMessages(data);
    };
    fetch();
  }, [conversation]);
 
  


  if (conversation == null) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-white/10 bg-slate-950/70 px-6 py-10 text-white/70 backdrop-blur-xl">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/20">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Pick a conversation</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Choose a chat from the sidebar to start a conversation and see your messages appear in a clean bubble layout.
          </p>
        </div>
      </div>
    );
  }
   const selectedUser = conversation.participants.find(function(participant){
       console.log(participant._id);
                return participant._id !== currentUser._id
                
            })
            console.log(currentUser);
            
            console.log(selectedUser);
            
  // Correct
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/40 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Chat</p>
          <h2 className="text-lg font-semibold text-white">
            {selectedUser?.username || "Conversation"}
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.45)]" />
          Active
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {messages.map((message) => {
          const isMyMessage = message.sender?._id
    ? message.sender._id.toString() === currentUser._id.toString()
    : message.sender.toString() === currentUser._id.toString()
            console.log('sender:', message.sender, 'currentUser:', currentUser._id, 'isMyMessage:', isMyMessage)
             console.log(message.sender._id);
             console.log(currentUser._id);
          return (
            <div
              key={message._id}
              className={isMyMessage ? "mb-4 flex justify-end" : "mb-4 flex justify-start"}
            >
              <div
                className={
                  isMyMessage
                    ? "max-w-[76%] rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm leading-6 text-white shadow-lg shadow-black/20"
                    : "max-w-[76%] rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm leading-6 text-white/90 shadow-lg shadow-black/20"
                }
              >
                <div className="whitespace-pre-wrap wrap-break-word">{message.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input bar at bottom */}
      <div className="border-t border-white/10 bg-slate-900/60 px-4 py-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-2 shadow-inner shadow-black/30">
          <Input
            className="flex-1 border-0 bg-transparent text-white placeholder:text-white/35 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Write something thoughtful..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button
            className="rounded-xl border border-white/10 bg-slate-800 px-5 font-medium text-white shadow-lg shadow-black/20 transition hover:scale-[1.02] hover:bg-slate-700"
            onClick={() => {
              handleSubmit();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
