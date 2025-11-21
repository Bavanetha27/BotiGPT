import React from 'react';

const Message = ({ message, index }) => {
  const isUser = message.from === 'user';

  const rotate = index % 3 === 0 ? '-1deg' : index % 3 === 1 ? '0.5deg' : '1.2deg';
  const fontSize = `${14 + (index % 4) * 2}px`;
  const fontFamily = index % 2 ? 'Comic Sans MS, cursive' : 'Courier New, monospace';

  return (
    <div className={`flex ${isUser ? 'justify-start' : 'justify-end'} px-4`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-lg ${isUser ? 'bg-yellow-100 text-black' : 'bg-green-100 text-black'}`}
        style={{ transform: `rotate(${rotate})`, fontSize, fontFamily }}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
        <div className="small-time text-${isUser ? 'left' : 'right'} mt-2" style={{ textAlign: isUser ? 'left' : 'right' }}>
          {new Date(message.time).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
