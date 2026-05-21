import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if the device supports hover (not a touch device)
    const checkDevice = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      setIsMobile(!hasHover);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    // Smooth spring lag interpolation for the outer ring
    const updateRingPosition = () => {
      const ease = 0.15; // interpolation factor
      
      const dx = mouseRef.current.x - ringRef.current.x;
      const dy = mouseRef.current.y - ringRef.current.y;
      
      ringRef.current.x += dx * ease;
      ringRef.current.y += dy * ease;
      
      setRingPosition({ x: ringRef.current.x, y: ringRef.current.y });
      requestRef.current = requestAnimationFrame(updateRingPosition);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    requestRef.current = requestAnimationFrame(updateRingPosition);

    // Track clickable items for hover expansion effects
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .clickable'
      );
      
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // MutationObserver to attach listeners to dynamically rendered items (e.g. modals, lists)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverListeners(); // Initial attach

    // Add cursor: none styling to body if active
    if (window.matchMedia('(hover: hover)').matches) {
      document.body.classList.add('cursor-none-active');
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      observer.disconnect();
      document.body.classList.remove('cursor-none-active');
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        @media (hover: hover) {
          .cursor-none-active,
          .cursor-none-active * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Inner Emerald Dot */}
      <div
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-emerald-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out ${
          isHidden ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        } ${isHovered ? 'scale-[0.2] bg-emerald-300' : ''} ${isClicked ? 'scale-75' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
        }}
      />

      {/* Outer Cyan Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-cyan-400 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHidden ? 'opacity-0 scale-0' : 'opacity-100'
        } ${isHovered ? 'w-12 h-12 border-emerald-400 bg-emerald-400/5 rotate-45' : 'w-7 h-7 bg-transparent'} ${
          isClicked ? 'scale-75 border-purple-400 bg-purple-400/10' : ''
        }`}
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          boxShadow: isHovered 
            ? '0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.2)' 
            : '0 0 12px rgba(0, 229, 255, 0.15)',
        }}
      />
    </>
  );
}
