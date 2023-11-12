import React from 'react';

import { HeadlingPorops } from './Headling.props';
import './Headling.scss';

export default function Headling({ children, ...props }: HeadlingPorops) {
  return (
    <h1 className='headling' {...props}>
      {children}
    </h1>
  );
}
