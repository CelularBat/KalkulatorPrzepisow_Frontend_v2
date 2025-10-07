import React from 'react';

const Overlay_Wrapper = ({ children, className = '', style = {}, onClick, onClose, ...rest }) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(128,128,128,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      ...style,
    }}
    {...rest}
  >
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '52px',
        fontWeight: 'bolder',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'yellow')}
      onMouseLeave={e => (e.currentTarget.style.color = 'black')}
    >
      ×
    </button>
    {children}
  </div>
);

export default Overlay_Wrapper;