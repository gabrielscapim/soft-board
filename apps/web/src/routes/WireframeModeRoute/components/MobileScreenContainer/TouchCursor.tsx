import React, { useState, useEffect } from 'react'

export function TouchCursor () {
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    function handleMouseMove (event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <style>{`
        body, #root {
          cursor: none;
        }
        .touch-cursor {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          width: 24px;
          height: 24px;
          border: 2px solid rgba(128, 128, 128, 0.7);
          border-radius: 50%;
          transform: translate(calc(var(--x) - 12px), calc(var(--y) - 12px));
          transition: background-color 0.2s ease, border-color 0.2s ease;
          z-index: 9999;
          background-color: rgba(128, 128, 128, 0.2);
        }
      `}</style>

      <div
        className="touch-cursor"
        style={{
          '--x': position.x + 'px',
          '--y': position.y + 'px'
        } as React.CSSProperties & Record<string, string>}
      />
    </>
  )
}
