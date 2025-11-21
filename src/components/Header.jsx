import React, { useState, forwardRef } from "react";

const Header = forwardRef(({ chatId = "chat-1", onStartExitSequence }, ref) => {
  const [title, setTitle] = useState("New Chat");

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", chatId);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-white/10 to-white/05 border-b border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-pink-400 to-indigo-500 flex items-center justify-center pixelate shadow-lg">
          <span className="text-3xl">🤖</span>
        </div>

        <div>
          <div className="text-lg font-extrabold tracking-tight text-white drop-shadow-md">
            BotiGPT
          </div>
          <div className="text-sm text-white/80 italic">
            Your AI assistant who tries... sometimes.
          </div>
           <div
            ref={ref}
            draggable
            onDragStart={handleDragStart}
            className="py-3 cursor-grab select-none flex items-center gap-3"
            title="Drag this heading into the bucket in the footer to delete the chat"
          >
            <div className="text-sm text-white/80">Title:</div>

            <input
              className="bg-transparent border-b border-white/20 focus:border-white/40 outline-none text-white font-semibold px-1 w-40"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Chat"
            />

            <div className="ml-auto text-xs text-white/60 italic">drag to delete 🗑️</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onStartExitSequence}
          className="px-3 py-1 rounded-lg bg-red-500 text-white hover:brightness-110 transition"
        >
          Exit (No chance)
        </button>
      </div>
    </header>
  );
});

export default Header;
