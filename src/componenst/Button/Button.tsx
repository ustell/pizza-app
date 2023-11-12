import { buttonProps } from './Button.props';
import cn from 'classnames';

import './Button.scss';

export default function Button({
  children,
  apperanse = 'small',
  className,
  ...props
}: buttonProps) {
  return (
    <button
      {...props}
      className={cn(className, 'btn', {
        ['accent']: apperanse === 'big',
        ['small']: apperanse === 'small',
      })}>
      {children}
    </button>
  );
}
