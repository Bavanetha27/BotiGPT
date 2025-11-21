import React, { useEffect, useRef, useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [value, setValue] = useState('');
  const containerRef = useRef(null);
  const sendRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onMove(e) {
      const btn = sendRef.current;
      if (!btn) return;
      const rectBtn = btn.getBoundingClientRect();
      const rectCont = container.getBoundingClientRect();

      const cx = e.clientX;
      const cy = e.clientY;

      const bx = rectBtn.left + rectBtn.width / 2;
      const by = rectBtn.top + rectBtn.height / 2;

      const dx = cx - bx;
      const dy = cy - by;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const threshold = 110; 
      if (dist < threshold && !caught) {
        const nx = (dx / (dist || 1)) * 60; 
        const ny = (dy / (dist || 1)) * 40; 

        const maxX = 70;
        const maxY = 36;
        const sx = Math.max(-maxX, Math.min(maxX, -nx));
        const sy = Math.max(-maxY, Math.min(maxY, -ny));

        setOffset({ x: sx, y: sy });

        if (Math.random() < 0.12) setCaught(true);
        setTimeout(() => setCaught(false), 900 + Math.random() * 1200);
      } else {
        setOffset((o) => ({ x: o.x * 0.85, y: o.y * 0.85 }));
      }
    }

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', () => setOffset({ x: 0, y: 0 }));

    return () => {
      container.removeEventListener('mousemove', onMove);
    };
  }, [caught]);

  const trySend = () => {
    if (Math.abs(offset.x) < 22 && Math.abs(offset.y) < 22) {
      if (value && value.trim()) onSend(value);
      else onSend('(system) You pressed Send but typed nothing.');
      setValue('');
    } else {
      onSend('(system) You chased the Send button but it escaped. Try the mic.');
      setValue('');
      setOffset((o) => ({ x: (o.x || 0) + (o.x >= 0 ? 16 : -16), y: (o.y || 0) - 8 }));
    }
  };

  const recordSend = () => {
    if (!value.trim()) {
      onSend('(voice) *you recorded silence*');
    } else {
      onSend('(voice) ' + value);
    }
    setValue('');
    setOffset({ x: 12, y: -6 });
    setTimeout(() => setOffset({ x: 0, y: 0 }), 600);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setValue((v) => v + '\n');
    }
  };

  return (
    <div
      ref={containerRef}
      className="px-6 py-4 bg-gradient-to-b from-white/10 to-white/5 rounded-lg"
    >
      <div className="flex items-center gap-3">
        {/* INPUT */}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type here... (Enter will NOT send)"
          rows={1}
          className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/10 placeholder-white/60 text-white outline-none resize-none"
        />

        <div
          ref={sendRef}
          className="inline-block"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 120ms cubic-bezier(.2,.9,.2,1)'
          }}
        >
          <button
            onClick={trySend}
            className="px-4 py-2 rounded-full bg-amber-400 hover:brightness-105 shadow-md"
            title="Send (if you can catch it)"
          >
            Send
          </button>
        </div>
        
        <button
          onClick={recordSend}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 shadow-lg flex items-center justify-center text-xl"
          title="Record and send (instant)"
        >
          🎙️
        </button>
      </div>

      <div className="mt-2 text-xs text-white/70 italic">Tip: Send button fears you — the mic is loyal.</div>
    </div>
  );
};

export default ChatInput;
