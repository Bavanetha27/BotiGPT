import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? (
    <ChatPage />
  ) : (
    <LandingPage onUnlock={() => setUnlocked(true)} />
  );
};

export default App;
