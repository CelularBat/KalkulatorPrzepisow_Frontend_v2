import React, { useState } from 'react';
import clsx from 'clsx';
import './Checkbox_holo.scss';

const Checkbox_holo = ({ children, alternativeChildren, className = '', ...rest }) => {
  const [checked, setChecked] = useState(rest.checked || false);
  const combinedClasses = clsx('Checkbox_holo', className, { checked });
  
  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (rest.onChange) rest.onChange(e);
  };

  return (
    <label className={combinedClasses}>
      <input
        type="checkbox"
        checked={checked}
        {...rest}
        onChange={handleChange}
      />
      <span></span>
      <div className='content'>
        {alternativeChildren? 
          checked?
            children
            : alternativeChildren
        : children
        }
        
      </div>
    </label>
  );
};

export default Checkbox_holo;
