import { useRef, useState } from 'react';
import './ResizableDivider.scss';


export default function ResizableDivider({ leftContent, rightContent, defaultLeftWidth = 50, min = 20, max = 70 }) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftWidth;

    const handleMouseMove = (eMove) => {
      if (!containerRef.current) return;
      const delta = ((eMove.clientX - startX) / containerRef.current.offsetWidth) * 100;
      setLeftWidth(Math.min(max, Math.max(min, startWidth + delta)));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='ResizableDivider' ref={containerRef}>
      <div className='leftPane' style={{ width: `${leftWidth}%` }}>{leftContent}</div>
      <div className='resizer' onMouseDown={handleMouseDown}></div>
      <div className='rightPane' style={{ width: `${100 - leftWidth}%` }}>{rightContent}</div>
    </div>
  );
}
