import React from 'react';
import clsx from 'clsx'; 
import './Button3D.scss';

const Button3D = ({ children, className = '',style={}, ...rest }) => {

  const combinedClasses = clsx('Button3D', className);

  return (
    <button type="button" className={combinedClasses} style={style}
        {...rest}
    >
        <div className="button-top">{children}</div>
        <div className="button-bottom"></div>
        <div className="button-base"></div>
    </button>
  );
};

export default Button3D;
