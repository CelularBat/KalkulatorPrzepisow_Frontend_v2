import React from 'react';
import clsx from 'clsx'; 
import './Button.scss';

const Button = ({ children, className = '',style={}, ...rest }) => {

  const combinedClasses = clsx('Button', className);

  return (
    <button
      className={combinedClasses}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
