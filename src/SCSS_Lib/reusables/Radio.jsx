import React from 'react';
import clsx from 'clsx';
import './Radio.scss';
const Radio = ({ children, className = '', ...rest }) => {

  const combinedClasses = clsx('Radio', className);

  return (
    <label className="RadioContainer">
      <input
        type="radio"
        className={combinedClasses}
        {...rest}
      />
      {children}
    </label>
  );
};

export default Radio;
