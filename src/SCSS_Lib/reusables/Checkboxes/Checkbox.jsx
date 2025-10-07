import React from 'react';
import clsx from 'clsx';
import './Checkbox.scss';

const Checkbox = ({ children, className = '', ...rest }) => {
  const combinedClasses = clsx('Checkbox', className);

  return (
    <label className="Checkbox">
      <input
        type="checkbox"
        className={combinedClasses}
        {...rest}
      />
      <span></span>
      {children}
    </label>
  );
};

export default Checkbox;