import React, { useEffect, useRef, useState } from "react";

const SettingsModal = ({ onClose }) => {
  const [tone, setTone] = useState(50);
  const [tilt, setTilt] = useState(0);

  const sliderRef = useRef(null);
  const animRef = useRef(null);
  const hoverRef = useRef(false);
  const lastMouseX = useRef(null);

  // Movement parameters
  const SPEED = 0.5; 
  const TILT_FACTOR = 0.12;
  const MAX_TILT = 8; 

  // Detect mouse position and influence slider
  const handleMouseMove = (e) => {
    if (!hoverRef.current || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    if (e.clientX < centerX) {
      setTone((prev) => Math.max(0, prev - SPEED));
      setTilt((t) => Math.max(-MAX_TILT, t - TILT_FACTOR));
    }

    if (e.clientX > centerX) {
      setTone((prev) => Math.min(100, prev + SPEED));
      setTilt((t) => Math.min(MAX_TILT, t + TILT_FACTOR));
    }

    lastMouseX.current = e.clientX;
  };

  const startHover = () => {
    hoverRef.current = true;
    window.addEventListener("mousemove", handleMouseMove);
  };

  const stopHover = () => {
    hoverRef.current = false;
    window.removeEventListener("mousemove", handleMouseMove);

    const ease = () => {
      setTilt((t) => {
        if (Math.abs(t) < 0.5) return 0;
        const newTilt = t * 0.85;
        animRef.current = requestAnimationFrame(ease);
        return newTilt;
      });
    };
    ease();
  };

  const manualChange = (e) => {
    const attempted = Number(e.target.value);
    const softened = tone + (attempted - tone) * 0.2;
    setTone(softened);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div
        className="relative bg-white rounded-xl p-6 w-[380px] shadow-xl border-2 border-red-300"
        style={{ transform: `rotate(${tilt * 0.1}deg)` }}
      >
        <h2 className="text-2xl font-bold mb-2">Bot Tone Settings</h2>
        <p className="mb-4">Hover the slider. It will escape based on where your cursor is 😈</p>

        <div
          className="p-4 bg-gray-100 rounded-xl"
          ref={sliderRef}
          onMouseEnter={startHover}
          onMouseLeave={stopHover}
          style={{
            transform: `rotate(${tilt}deg)`,
            transition: hoverRef.current ? "none" : "transform 0.3s ease",
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={tone}
            onChange={manualChange}
            className="w-full cursor-pointer"
            style={{
              transform: `rotate(${-tilt * 0.1}deg)`,
            }}
          />

          <div className="mt-3 text-sm font-semibold text-gray-700">
            Tone: {Math.round(tone)} / 100
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-5">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={() => {
              alert("Tone saved – probably wrong value 🤷‍♂️");
              onClose();
            }}
          >
            Save
          </button>
          <button className="px-4 py-2 border rounded-md" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
