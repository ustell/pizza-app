import React, { forwardRef } from 'react';
import cn from 'classnames';
import './Input.scss';
import { inputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, inputProps>(function Input(
  { isValid = true, className, ...props },
  ref,
) {
  return (
    <div className='input__search'>
      <input
        ref={ref}
        {...props}
        className={cn(className, 'input', {
          ['invalid']: !isValid,
        })}
      />
      <img className='search__icon' src='./search.svg' alt='' />
    </div>
  );
});
export default Input;
