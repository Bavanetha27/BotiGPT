import React, { useState } from "react";

// Yes messages
const YES_MESSAGES = [
  "⚠️ Wow… you really want to exit? Bold move.",
  "😬 Brave. But is it the RIGHT choice?",
  "😟 You’re still choosing YES? Unexpected.",
  "😰 The system is sweating. Please reconsider.",
  "🥵 Confirming YES again? Suspicious!",
  "😵 You might destabilize the universe…",
  "🤯 Final warning? Probably not.",
  "😨 Are you absolutely, unquestionably, undeniably sure?"
];

// No messages
const NO_MESSAGES = [
  "😊 Good choice. I knew you were smart.",
  "😌 Staying is nice, isn’t it?",
  "😄 Thank you for not leaving!",
  "😍 Awww, you clicked No again!",
  "😎 Great decision. Very stable.",
  "✨ See? Everything is fine when you stay.",
  "😇 Your loyalty is appreciated.",
  "🤝 You and this chatbot… a strong bond."
];

const ExitPopups = ({ onCloseSequence }) => {
  const [indexYes, setIndexYes] = useState(0);
  const [indexNo, setIndexNo] = useState(0);
  const [mode, setMode] = useState("yes"); 

  const onYes = () => {
    setMode("yes");
    setIndexYes((i) => (i + 1) % YES_MESSAGES.length);
  };

  const onNo = () => {
    setMode("no");
    setIndexNo((i) => (i + 1) % NO_MESSAGES.length);
  };

  const finalExit = () => {
    if (typeof onCloseSequence === "function") onCloseSequence();
  };

  const closeWebsite = () => {
    window.close();

    window.location.href = "about:blank";
  };

  const currentMessage =
    mode === "yes" ? YES_MESSAGES[indexYes] : NO_MESSAGES[indexNo];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-50 bg-white p-6 rounded-2xl w-[360px] shadow-xl">

        <button
          onClick={closeWebsite}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 
                     text-xl leading-none focus:outline-none"
          aria-label="Close website"
          title="Close website"
        >
          ✖️
        </button>

        <h2 className="text-xl font-bold text-rose-600 mb-3">Exit Confirmation</h2>

        <p className="text-gray-700 text-sm mb-5">{currentMessage}</p>

        <div className="flex gap-3">
          <button
            onClick={onYes}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow 
                       hover:scale-105 active:scale-95 
                       focus:outline-none"
          >
            Yes
          </button>

          <button
            onClick={onNo}
            className="px-4 py-2 bg-gray-200 rounded-lg shadow 
                       hover:bg-gray-300 active:scale-95 
                       focus:outline-none"
          >
            No
          </button>

          <button
            onClick={finalExit}
            className="ml-auto px-3 py-2 bg-yellow-400 rounded-lg shadow 
                       hover:brightness-105 active:scale-95
                       focus:outline-none text-sm"
          >
            Give Up 😵
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitPopups;
