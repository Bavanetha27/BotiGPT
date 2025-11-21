import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import Footer from '../components/Footer';
import SettingsModal from '../components/SettingsModal';
import ExitPopups from '../components/ExitPopups';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: 'Welcome. I may be useless. Try me.', time: Date.now() }
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [showExitPopups, setShowExitPopups] = useState(false);

  const headerRef = useRef(null); 
  const bucketRef = useRef(null); 

  const [currentChat, setCurrentChat] = useState({ id: 'chat-1', title: 'Current Chat' });

  const pushMessage = (from, text) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), from, text, time: Date.now() }]);
  };

  const handleSend = (text) => {
    if (!text || !text.trim()) return;
    pushMessage('user', text);
    setTimeout(() => {
      pushMessage('bot', ['Idk bro 😴','Maybe. Maybe not.','Depends on the weather.'][Math.floor(Math.random()*3)]);
    }, 2500 + Math.random()*7000);
  };

  const deleteChatAnimated = (chatId) => {
    const headerNode = headerRef.current;
    const bucketNode = bucketRef.current;

    if (!headerNode || !bucketNode) {
      const welcome = { id: Date.now() + Math.random(), from: 'bot', text: 'Welcome. I may be useless. Try me.', time: Date.now() };
      setMessages([welcome]);
      setCurrentChat({ id: 'chat-new', title: 'New Chat' });
      return;
    }

    const hRect = headerNode.getBoundingClientRect();
    const bRect = bucketNode.getBoundingClientRect();

    const clone = headerNode.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = `${hRect.left}px`;
    clone.style.top = `${hRect.top}px`;
    clone.style.width = `${hRect.width}px`;
    clone.style.height = `${hRect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = 9999;
    clone.style.transition = 'transform 600ms cubic-bezier(.22,.9,.3,1), opacity 500ms ease';
    clone.style.boxShadow = '0 18px 40px rgba(0,0,0,0.25)';
    clone.style.background = window.getComputedStyle(headerNode).background || 'rgba(255,255,255,0.02)';
    document.body.appendChild(clone);

    const targetX = (bRect.left + bRect.width / 2) - (hRect.left + hRect.width / 2);
    const targetY = (bRect.top + bRect.height / 2) - (hRect.top + hRect.height / 2);

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.28) rotate(420deg)`;
      clone.style.opacity = '0.12';
    });

    const cleanup = () => {
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      const welcome = { id: Date.now() + Math.random(), from: 'bot', text: 'Welcome. I may be useless. Try me.', time: Date.now() };
      setMessages([welcome]);
      setCurrentChat({ id: 'chat-new', title: 'New Chat' });
    };

    setTimeout(() => {
      cleanup();
    }, 700);
  };

  const handleFooterDropDelete = (chatId) => {
    deleteChatAnimated(chatId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-violet-900 to-cyan-600 p-6">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-yellow-200 tilt overflow-hidden">
        <Header onStartExitSequence={() => setShowExitPopups(true)} ref={headerRef} chatId={currentChat.id} title={currentChat.title} />
        <ChatInput onSend={handleSend} />
        <MessageList messages={messages} />

        <Footer
          onAction={(a) => pushMessage('bot', a)}
          onOpenSettings={() => setShowSettings(true)}
          onDeleteChat={() => deleteChatAnimated(currentChat.id)}
          onDropDelete={handleFooterDropDelete}
          bucketRef={bucketRef}
        />
      </div>

      {showExitPopups && <ExitPopups onCloseSequence={() => setShowExitPopups(false)} />}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default ChatPage;
