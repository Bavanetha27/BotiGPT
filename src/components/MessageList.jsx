import React from 'react';
import Message from './Message';

const MessageList = ({ messages = [] }) => {
  return (
    <div className="p-6 h-[56vh] overflow-auto relative bg-white/10">
      <div className="absolute left-6 top-6 px-3 py-1 rounded-md bg-red-500 text-white animate-pulse shadow">⚠️ Low IQ Mode Activated</div>

      <div className="space-y-4 mt-10">
        {messages.map((m, i) => (
          <div key={m.id}>
            <div className={`flex items-start ${m.from === 'user' ? 'justify-start' : 'justify-end'} px-2`}>
              {m.from === 'user' && (
                <div className="mr-3">
                  <div className="w-9 h-9 rounded-full bg-blue-300 flex items-center justify-center">🙂</div>
                </div>
              )}

              <Message message={m} index={i} />

              {m.from === 'bot' && (
                <div className="ml-3">
                  <div className="w-9 h-9 rounded-full bg-purple-300 flex items-center justify-center">🤖</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
