import React, { useEffect, useRef } from 'react';

const Footer = ({ onAction, onOpenSettings, onDeleteChat, onDropDelete, bucketRef }) => {
  const internalBucketRef = useRef(null);

  useEffect(() => {
    if (bucketRef) {
      bucketRef.current = internalBucketRef.current;
    }
  }, [bucketRef]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const chatId = e.dataTransfer.getData('text/plain');
    if (typeof onDropDelete === 'function') onDropDelete(chatId || 'chat-unknown');
  };

  return (
    <footer className="flex items-center justify-between px-6 py-3 bg-white/30 border-t border-white/20">
      <div className="flex items-center gap-3">
        <div
          ref={internalBucketRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          title="Drop chat heading here to delete"
          className="relative inline-flex px-3 py-1 rounded-md bg-white/20 items-center justify-center w-12 h-10 rounded-md  border border-white/10"
          style={{ cursor: 'pointer' }}
        >
          <div className="text-lg">🗑️</div>
        </div>

        <button onClick={onOpenSettings} className="px-3 py-1 rounded-md bg-white/20">🍕 Settings</button>
      </div>

      <div className="flex items-center gap-3">
         <div className="text-sm italic text-white/90">Version 0.1 — Wrong answers guaranteed</div>
      </div>
    </footer>
  );
};

export default Footer;
