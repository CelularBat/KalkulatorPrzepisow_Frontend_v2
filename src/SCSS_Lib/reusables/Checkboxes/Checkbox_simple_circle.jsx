import React from 'react';
import clsx from 'clsx';
import './Checkbox_simple_circle.scss';

const Checkbox_simple_circle = ({children, className = '', ...rest }) => {
  const combinedClasses = clsx('Checkbox_simple_circle', className);

  return (
    <label className={combinedClasses}>
      {children}
      <input
        type="checkbox"
        {...rest}
      />
      <span></span>
   
    </label>
  );
};

export default Checkbox_simple_circle;