import React, { useRef, useState, useEffect } from "react";

const LandingPage = ({ onUnlock }) => {
  const keyRef = useRef(null);
  const lockRef = useRef(null);
  const titleRef = useRef(null);

  const [pos, setPos] = useState({ x: 24, y: 18 });
  const [defaultPos, setDefaultPos] = useState({ x: 24, y: 18 });
  const [dragging, setDragging] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const KEY_SIZE = 32;

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [sliderIndex, setSliderIndex] = useState(0); 

  useEffect(() => {
    const updateDefault = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const x = Math.max(8, rect.left - KEY_SIZE - 8);
        const y = Math.max(8, rect.top + rect.height / 2 - KEY_SIZE / 2);
        setDefaultPos({ x, y });
        setPos({ x, y });
      }
    };

    updateDefault();
    window.addEventListener("resize", updateDefault);
    return () => window.removeEventListener("resize", updateDefault);
  }, []);

  // pointer handlers
  const onPointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    const rect = keyRef.current.getBoundingClientRect();
    const startX = (e.clientX ?? e.touches?.[0]?.clientX) || 0;
    const startY = (e.clientY ?? e.touches?.[0]?.clientY) || 0;
    setMouseOffset({ x: startX - rect.left, y: startY - rect.top });
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const clientX = (e.clientX ?? e.touches?.[0]?.clientX) || 0;
    const clientY = (e.clientY ?? e.touches?.[0]?.clientY) || 0;

    let nextX = clientX - mouseOffset.x;
    let nextY = clientY - mouseOffset.y;

    const padding = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    nextX = Math.max(padding, Math.min(nextX, vw - KEY_SIZE - padding));
    nextY = Math.max(padding + 56, Math.min(nextY, vh - KEY_SIZE - 80));

    setPos({ x: nextX, y: nextY });
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);

    if (!keyRef.current || !lockRef.current) return;
    const keyRect = keyRef.current.getBoundingClientRect();
    const lockRect = lockRef.current.getBoundingClientRect();

    const overlap =
      keyRect.left < lockRect.right &&
      keyRect.right > lockRect.left &&
      keyRect.top < lockRect.bottom &&
      keyRect.bottom > lockRect.top;

    if (overlap) {
      setPos({ x: lockRect.left + lockRect.width / 2 - KEY_SIZE / 2, y: lockRect.top + lockRect.height / 2 - KEY_SIZE / 2 });
      setTimeout(() => setShowModal(true), 180);
    } else {
      setPos({ x: defaultPos.x + (Math.random() * 8 - 4), y: defaultPos.y + (Math.random() * 4 - 2) });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [dragging, mouseOffset, defaultPos]);

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const currentLetter = alphabet[sliderIndex];

  const addLetter = () => setName((s) => (s + currentLetter).slice(0, 32));
  const backspace = () => setName((s) => s.slice(0, -1));
  const submitName = () => {
    if (!name) return;
    setShowModal(false);
    onUnlock?.(name);
    setTimeout(() => setPos(defaultPos), 150);
  };

  const cancelNaming = () => {
    setShowModal(false);
    setPos(defaultPos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-700 relative">
        <div className="flex items-center gap-3">
          <div ref={titleRef} className="text-2xl font-bold flex items-center gap-2 ml-4">
            <span className="sr-only">Site key</span>
            <span>BotiGPT</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="text-[16px]">Your personal chatbot</span>
            <span className="hidden md:inline text-slate-400">— drag the key from the header to unlock</span>
          </div>
        </div>

        <nav className="text-sm text-slate-300 hidden md:flex gap-6">
          <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
          <a href="#" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to BotiGPT</h1>
        <p className="text-slate-400 mb-6">Drag the small key from the header (left of the title) into the lock to unlock and name your key.</p>
        <div className="flex items-center gap-12 mt-4">
          <div className="text-6xl" ref={lockRef}>
            🔒
          </div>
          <div className="text-slate-500">Place the small key into the lock to enter</div>
        </div>
        <div
          ref={keyRef}
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            width: KEY_SIZE,
            height: KEY_SIZE,
            lineHeight: `${KEY_SIZE}px`,
            cursor: dragging ? "grabbing" : "grab",
            transition: dragging ? "none" : "transform 300ms ease, left 300ms ease, top 300ms ease",
            zIndex: 60,
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
          aria-label="draggable-key"
          className="bg-white/5 rounded-md shadow-md">
          🔑
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-4 border-t border-slate-700 text-slate-400 text-sm flex items-center justify-between">
        <div>© {new Date().getFullYear()} BotiGPT</div>
        <div>Tip: drag carefully — aim for the center of the lock.</div>
      </footer>

      {/* NAMING MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3">Enter UserName</h2>
            <p className="text-slate-400 text-sm mb-4">Use the slider to select letters (A–Z). Add letters to build the name.</p>

            <div className="mb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white/5 rounded">{currentLetter}</div>
                <div className="flex-1">
                  <input value={name} readOnly className="w-full bg-transparent border border-slate-700 rounded px-3 py-2 text-white" />
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={25}
                value={sliderIndex}
                onChange={(e) => setSliderIndex(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button className="px-3 py-2 rounded bg-slate-700 text-slate-200" onClick={backspace}>
                Backspace
              </button>
              <button className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500" onClick={addLetter}>
                Add "{currentLetter}"
              </button>
              <button className="px-3 py-2 rounded bg-green-600 hover:bg-green-500" onClick={submitName}>
                Submit
              </button>
              <button className="px-3 py-2 rounded bg-slate-600" onClick={cancelNaming}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
